import statusCodes from 'utils/statusCodes'
import { createCategory, getRestaurant } from 'utils/db'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'POST':
			console.log(req.body)

			const { category, restaurantSlug, citySlug } = req.body

			const restaurant = await getRestaurant({
				restaurantSlug,
				citySlug,
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
