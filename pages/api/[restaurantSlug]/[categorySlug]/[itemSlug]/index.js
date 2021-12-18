import statusCodes from 'utils/statusCodes'
import { getItem } from 'pages/api/items/[itemId]'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'

export default async function handler(req, res) {
	const {
		query: { restaurantSlug, categorySlug, itemSlug },
		method,
	} = req

	switch (method) {
		case 'GET': {
			const item = await getFullItem({
				restaurantSlug,
				categorySlug,
				itemSlug,
			})
			res.status(statusCodes.ok).json(item)
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getFullItem({ restaurantSlug, categorySlug, itemSlug }) {
	const item = await getItem({
		restaurantSlug,
		categorySlug,
		itemSlug,
	})

	if (!item) {
		return {
			notFound: true,
		}
	}

	const restaurant = await getRestaurant({ restaurantId: item.restaurantId })

	item.restaurant = restaurant

	return item
}
