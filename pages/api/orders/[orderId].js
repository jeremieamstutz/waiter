import { getServerSession } from 'next-auth'
import slugify from 'slugify'

import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'
import { markRestaurantAsUpdated } from 'pages/api/restaurants/[restaurantId]'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	const {
		query: { itemId },
		method,
	} = req

	switch (method) {
		case 'PUT': {
			const session = await getServerSession(req, res, authOptions)
			const item = await getItem({ itemId })

			if (
				session.user.id !== item.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			let { item: newItem } = req.body
			newItem.id = itemId
			newItem.slug = slugify(newItem.name, {
				lower: true,
				remove: /[*+~.()'"!:@]/g,
			})

			newItem = await updateItem({ item: newItem })
			await markRestaurantAsUpdated({ restaurantId: item.restaurantId })

			res.status(statusCodes.ok).json({ item: newItem })
			break
		}
		case 'DELETE': {
			const session = await getServerSession(req, res, authOptions)
			const item = await getItem({ itemId })
			if (
				session.user.id !== item.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			await deleteItem({ itemId })
			await markRestaurantAsUpdated({ restaurantId: item.restaurantId })

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getItem({
	restaurantSlug,
	categorySlug,
	itemSlug,
	itemId,
}) {
	if (itemId) {
		const result = await query(
			`
			SELECT 
				items.*, 
				items.restaurant_id AS "restaurantId", 
				restaurants.owner_id AS "ownerId", 
				items.category_id AS "categoryId",
				restaurants.slug AS "restaurantSlug",
            	categories.slug AS "categorySlug"
			FROM 
				items 
			JOIN 
				restaurants ON restaurants.id = items.restaurant_id
			JOIN 
				categories ON categories.id = items.category_id
			WHERE 
				items.id = $1`,
			[itemId],
		)
		return result.rows[0]
	}
	if (restaurantSlug && categorySlug && itemSlug) {
		const result = await query(
			`
			SELECT 
				items.*, 
				items.restaurant_id AS "restaurantId", 
				restaurants.owner_id AS "ownerId", 
				items.category_id AS "categoryId",
				restaurants.slug AS "restaurantSlug",
				categories.slug AS "categorySlug"
			FROM 
				items 
			JOIN 
				restaurants ON restaurants.id = items.restaurant_id
			JOIN 
				categories ON categories.id = items.category_id
			WHERE 
				restaurants.slug = $1 AND categories.slug = $2 AND items.slug = $3`,
			[restaurantSlug, categorySlug, itemSlug],
		)
		return result.rows[0]
	}
	return
}

export async function updateItem({ item }) {
	const { id, slug, name, description, price, available, currency, image } =
		item
	const result = await query(
		`
		UPDATE 
			items 
		SET 
			slug = $2, 
			name = $3, 
			description = $4, 
			price = $5, 
			available = $6, 
			currency = $7, 
			image = $8
		WHERE 
			id = $1
		RETURNING 
			*, 
			restaurant_id AS "restaurantId", 
			category_id AS "categoryId"`,
		[id, slug, name, description, price, available, currency, image],
	)
	return result.rows[0]
}

export async function deleteItem({ itemId }) {
	await query(
		`DELETE FROM 
			items 
		WHERE 
			items.id = $1`,
		[itemId],
	)
}
