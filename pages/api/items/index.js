import statusCodes from 'utils/statusCodes'
import slugify from 'slugify'
import { query } from 'utils/db'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'POST':
			const { item } = req.body
			item.slug = slugify(item.name, { lower: true })

			await createItem(item)

			res.status(statusCodes.ok).json({})
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function createItem(item) {
	const result = await query(
		`
		INSERT INTO items
			(restaurant_id, slug, category, name, description, price, currency, image)
		VALUES
			($1, $2, $3, $4, $5, $6, $7, $8)
		`,
		[
			item.restaurantId,
			item.slug,
			item.category,
			item.name,
			item.description,
			item.price,
			item.currency,
			item.image,
		],
	)
	return result.rows[0]
}

export async function getAllItems() {
	const result = await query(`SELECT items.* FROM items`)
	return result.rows
}

export async function getAllItemsSlugs() {
	const result = await query(
		`SELECT items.slug AS "itemSlug", restaurants.slug AS "restaurantSlug" FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant_id`,
	)
	return result.rows
}
