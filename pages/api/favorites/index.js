import { getServerSession } from 'next-auth'

import { Favorite } from 'db/models'

import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	const { method } = req

	const session = await getServerSession(req, res, authOptions)

	if (!session) return res.status(statusCodes.forbidden).end()

	switch (method) {
		case 'GET': {
			const favorites = await Favorite.findAll({
				where: { userId: session.user.id },
			})

			res.status(statusCodes.ok).json({
				restaurantIds: favorites.map(
					(favorite) => favorite.restaurantId,
				),
			})
			break
		}
		case 'POST': {
			await addFavorite({
				restaurantId: req.body.restaurantId,
				userId: session.user.id,
			})

			const favorites = await getAllFavorites({
				userId: session.user.id,
			})
			res.status(statusCodes.ok).json({
				restaurantIds: favorites.map(
					(favorite) => favorite.restaurantId,
				),
			})
			break
		}
		case 'DELETE': {
			await deleteFavorite({
				restaurantId: req.body.restaurantId,
				userId: session.user.id,
			})

			const favorites = await getAllFavorites({
				userId: session.user.id,
			})
			res.status(statusCodes.ok).json({
				restaurantIds: favorites.map(
					(favorite) => favorite.restaurantId,
				),
			})
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function addFavorite({ restaurantId, userId }) {
	return await query(
		`
		INSERT INTO favorites 
			(restaurant_id, user_id)
		VALUES 
			($1, $2)
		RETURNING *`,
		[restaurantId, userId],
	)
}

export async function deleteFavorite({ restaurantId, userId }) {
	return await query(
		`
		DELETE FROM favorites
		WHERE restaurant_id = $1 AND user_id = $2`,
		[restaurantId, userId],
	)
}

export async function getAllFavorites({ userId }) {
	const result = await query(
		`
		SELECT restaurant_id AS "restaurantId" FROM favorites
		WHERE favorites.user_id = $1`,
		[userId],
	)
	return result.rows
}
