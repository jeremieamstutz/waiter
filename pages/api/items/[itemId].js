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

			await updateItem(item)

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'DELETE':
			await deleteItem(itemId)

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getItem({ itemSlug, restaurantSlug }) {
	const result = await query(
		`SELECT items.* FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant_id
		WHERE items.slug = $1 AND restaurants.slug = $2`,
		[itemSlug, restaurantSlug],
	)
	return result.rows[0]
}

export async function updateItem(item) {
	await query(
		`UPDATE items 
		SET slug = $2, name = $3, description = $4, price = $5, currency = $6, image = $7
		WHERE items.id = $1`,
		[
			item.id,
			item.slug,
			item.name,
			item.description,
			item.price,
			item.currency,
			item.image,
		],
	)
}

export async function deleteItem(id) {
	await query(
		`DELETE FROM items 
		WHERE items.id = $1`,
		[id],
	)
}
