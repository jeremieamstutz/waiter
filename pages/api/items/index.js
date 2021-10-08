import statusCodes from 'utils/statusCodes'
import * as db from 'utils/db'
import slugify from 'slugify'

export async function getItems() {
	const result = await db.query('SELECT * FROM items')
}

export async function getItem({ itemSlug, restaurantSlug, citySlug }) {
    // const result = await db.query('SELECT items, restaurants.slug as restaurantSlug FROM items WHERE items.slug = $1, restaurantSlug = $2 JOIN restaurants ON restaurants.id = items.restaurant', [itemSlug, restaurantSlug])
	const result = await db.query('SELECT items.* FROM items JOIN restaurants ON restaurants.id = items.restaurant JOIN address ON address.id = restaurants.address JOIN cities ON cities.id = address.city WHERE items.slug = $1 AND restaurants.slug = $2 AND cities.slug = $3', [itemSlug, restaurantSlug, citySlug])
	return result.rows[0]
}

export default async function handler(req, res) {
	const { method } = req

	// const resQuery = await db.query(
	// 	'SELECT restaurants.name, restaurants.slug, restaurants.description, restaurants.intro, array_agg(items) as itms FROM restaurants JOIN items ON restaurants.id = items.restaurantId GROUP BY restaurants.id;',
	// )

	// CREATE TABLE items (
	// 	id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	// 	restaurantId uuid,
	// 	slug VARCHAR(48),
	// 	category uuid,
	// 	name VARCHAR(32),
	// 	description TEXT,
	// 	price NUMERIC(6, 2),
	// 	currency VARCHAR(3),
	// 	available BOOLEAN DEFAULT TRUE,
	// 	image VARCHAR(500)

	// console.log(resQuery.rows)
	// res.status(statusCodes.ok).json(resQuery.rows)
	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json({status: 'success'})
			break
		case 'POST':
			console.log(req.body)

			const item = req.body
			item.slug = slugify(item.name, {lower: true})

			item.category = '890be6ae-8b2c-4150-bb99-0716e6cef54a'
			
			const query = await db.query(
				`INSERT INTO items (restaurant, slug, category, name, description, price, currency, image) VALUES ('92c6e519-dc99-4778-bc73-f593e9071163', '${item.slug}', '${item.category}', '${item.name}', '${item.description}', ${item.price}, '${item.currency}', '${item.image}');`,
			)
			res.status(statusCodes.ok).json({})
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
