import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
	const { method } = req

	const session = await getSession({ req })

	if (!session) return res.status(statusCodes.forbidden).end()

	switch (method) {
		case 'GET': {
			const restaurants = await getAllFavoriteRestaurants({
				userId: session.user.id,
			})
			res.status(statusCodes.ok).json({
				restaurants,
			})
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getAllFavoriteRestaurants({ userId }) {
	const result = await query(
		`SELECT
			id,
			slug, 
			owner_id AS "ownerId", 
			image,
			name,
			description,
			cuisine,
			phone,
			website
			address,
			street,
			street_number AS "streetNumber", 
			postal_code AS "postalCode",
			city,
			region,
			country,
			latitude,
			longitude,
			restaurants.created_at AS "createdAt",
			updated_at AS "updatedAt"
		FROM 
			restaurants
        JOIN 
			favorites 
		ON 
			favorites.restaurant_id = restaurants.id
		WHERE 
			favorites.user_id = $1
        ORDER BY 
			favorites.created_at DESC`,
		[userId],
	)
	return result.rows
}
