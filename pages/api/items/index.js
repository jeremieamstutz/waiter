import statusCodes from 'utils/statusCodes'
import slugify from 'slugify'
import { getRestaurant, createItem } from 'utils/db'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json({status: 'success'})
			break
		case 'POST':
			const { item, restaurantSlug, citySlug } = req.body
			item.slug = slugify(item.name, {lower: true})

			const restaurant = await getRestaurant({
				restaurantSlug,
				citySlug,
			})
			item.restaurant = restaurant.id
			
			await createItem(item)

			res.status(statusCodes.ok).json({})
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
