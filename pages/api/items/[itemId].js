import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'
import slugify from 'slugify'

export default async function handler(req, res) {
	const {
		query: { itemId },
		method,
	} = req

	switch (method) {
		case 'PUT':
			const { item } = req.body
			item.id = itemId
			item.slug = slugify(item.name, { lower: true })

			await updateItem({ item })

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'DELETE':
			await deleteItem({ itemId })

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getItem({ restaurantSlug, categorySlug, itemSlug }) {
	const result = await query(
		`SELECT items.*, items.category_id AS "categoryId" FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant_id
		JOIN categories ON categories.id = items.category_id
		WHERE restaurants.slug = $1 AND categories.slug = $2 AND items.slug = $3`,
		[restaurantSlug, categorySlug, itemSlug],
	)
	return result.rows[0]
}

export async function updateItem({ item }) {
	const { id, slug, name, description, price, currency, image } = item
	await query(
		`UPDATE items 
		SET slug = $2, name = $3, description = $4, price = $5, currency = $6, image = $7
		WHERE items.id = $1`,
		[id, slug, name, description, price, currency, image],
	)
}

export async function deleteItem({ id }) {
	await query(
		`DELETE FROM items 
		WHERE items.id = $1`,
		[id],
	)
}
