import statusCodes from 'utils/statusCodes'
import slugify from 'slugify'
import { query } from 'utils/db'
import { getSession } from 'next-auth/react'
import {
	getRestaurant,
	markRestaurantAsUpdated,
} from '../restaurants/[restaurantId]'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'POST':
			const { item } = req.body

			const session = await getSession({ req })
			const restaurant = await getRestaurant({
				restaurantId: item.restaurantId,
			})

			if (
				session.user.id !== restaurant.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			item.slug = slugify(item.name, {
				lower: true,
				remove: /[*+~.()'"!:@]/g,
			})

			const newItem = await createItem({ item })
			await markRestaurantAsUpdated({ restaurantId: item.restaurantId })

			res.status(statusCodes.ok).json({ item: newItem })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function createItem({ item }) {
	const {
		restaurantId,
		slug,
		categoryId,
		name,
		description,
		price,
		currency,
		image,
	} = item
	const result = await query(
		`
		INSERT INTO items
			(restaurant_id, slug, category_id, name, description, price, currency, image)
		VALUES
			($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING *
		`,
		[
			restaurantId,
			slug,
			categoryId,
			name,
			description,
			price,
			currency,
			image,
		],
	)
	return result.rows[0]
}

export async function getAllItems() {
	const result = await query(
		`SELECT items.*, items.category_id AS "categoryId" FROM items`,
	)
	return result.rows
}

export async function getAllItemSlugs() {
	const result = await query(
		`SELECT restaurants.slug AS "restaurantSlug", categories.slug AS "categorySlug", items.slug AS "itemSlug" FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant_id
		JOIN categories on categories.id = items.category_id`,
	)
	return result.rows
}
