import statusCodes from 'utils/statusCodes'
import {
	getRestaurant,
	getRestaurantCategories,
	getRestaurantItems,
} from 'pages/api/restaurants/[restaurantId]'

export default async function handler(req, res) {
	const {
		query: { restaurantSlug },
		method,
	} = req

	switch (method) {
		case 'GET': {
			const restaurant = await getFullRestaurant({ restaurantSlug })
			res.status(statusCodes.ok).json(restaurant)
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getFullRestaurant({ restaurantSlug, restaurantId }) {
	const restaurant = await getRestaurant({ restaurantSlug, restaurantId })

	if (!restaurant) {
		return null
	}

	const items = await getRestaurantItems({ restaurantId: restaurant.id })
	const categories = await getRestaurantCategories({
		restaurantId: restaurant.id,
	})

	restaurant.items = items
	restaurant.categories = categories
	restaurant.rating = {
		value: 4.9,
		count: 10,
	}
	restaurant.isOpen = true

	return restaurant
}
