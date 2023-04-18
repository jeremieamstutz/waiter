import { getServerSession } from 'next-auth'

import statusCodes from 'utils/statusCodes'
import { query, sql } from 'utils/db'
import { getRestaurant } from './[restaurantId]'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	const { method } = req

	const session = await getServerSession(req, res, authOptions)

	if (!session) return res.status(statusCodes.forbidden).end()

	switch (method) {
		case 'GET': {
			const restaurants = await getAllFavoriteRestaurants(session.user.id)
			res.status(statusCodes.ok).json(restaurants)
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getAllFavoriteRestaurants(userId) {
	const favorites = (
		await query(
			sql`SELECT
				"restaurant_id" AS "restaurantId"
			FROM
				"favorites"
			WHERE 
				"user_id" = ${userId}
			ORDER BY 
				"created_at" DESC`,
		)
	).rows

	const restaurants = await Promise.all(
		favorites.map(
			async (favorite) =>
				await getRestaurant({ restaurantId: favorite.restaurantId }),
		),
	)

	return restaurants
}
