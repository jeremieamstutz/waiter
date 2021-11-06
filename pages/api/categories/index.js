import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'POST':
			console.log(req.body)

			const { category, restaurantSlug } = req.body

			const restaurant = await getRestaurant({
				restaurantSlug,
			})
			category.restaurant = restaurant.id

			const result = await createCategory({ category })

			res.status(statusCodes.ok).json({ result })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function createCategory({ category }) {
	const result = await query(
		`
		INSERT INTO categories (name, description, restaurant)
		VALUES ($1, $2, $3)
		`,
		[category.name, category.description, category.restaurant],
	)
	return result.rows[0]
}