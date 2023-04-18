import statusCodes from 'utils/statusCodes'
import slugify from 'slugify'
import { query, sql } from 'utils/db'
import {
	getRestaurant,
	markRestaurantAsUpdated,
} from '../restaurants/[restaurantId]'
import { Item } from 'db/models'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'POST':
			const item = req.body

			const session = await getServerSession(req, res, authOptions)
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

			const itemCount = await Item.count({
				where: { categoryId: item.categoryId },
			})
			const newItem = await Item.create({
				...item,
				sequenceNumber: itemCount + 1,
			})

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
		categoryId,
		name,
		description,
		price,
		currency,
		tags,
		allergies,
		image,
	} = item
	const result = await query(
		sql`INSERT INTO 
				items (restaurant_id, category_id, name, description, price, currency, image)
			VALUES
				(${restaurantId}, ${categoryId}, ${name}, ${description}, ${price}, ${currency}, ${image})
			RETURNING *
		`,
	)
	// await query(
	// 	sql`INSERT INTO
	// 			tags (item_id, key)`,
	// )
	return result.rows[0]
}

export async function getAllItems() {
	const result = await query(
		`SELECT
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
			categories ON categories.id = items.category_id`,
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
