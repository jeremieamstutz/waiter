import { getServerSession } from 'next-auth'

import { query, sql } from 'utils/db'
import statusCodes from 'utils/statusCodes'
import { getRestaurant } from '..'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(req, res) {
	const {
		method,
		query: { restaurantId },
		body,
	} = req

	switch (method) {
		case 'GET': {
			return
		}
		case 'POST': {
			const session = await getServerSession(req, res, authOptions)

			if (!session) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not connected' })
			}

			const restaurant = await getRestaurant({ restaurantId })

			if (
				session.user.id !== restaurant.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not the owner' })
			}

			const image = body

			const createdImage = await createRestaurantImage({
				restaurantId: restaurant.id,
				...image,
			})

			return res.status(statusCodes.ok).json(createdImage)
		}
		default: {
			return res.status(statusCodes.methodNotAllowed).end()
		}
	}
}

export async function getAllRestaurantImages(restaurantId) {
	const result = await query(sql`
        SELECT 
            *
        FROM
            "restaurant_images"
        WHERE
            "restaurant_id" = ${restaurantId}
		ORDER BY
			"order"
    `)
	return result.rows
}

export async function createRestaurantImage(image) {
	const { restaurantId, url, alt, legend, order } = image
	const result = await query(sql`
            INSERT INTO 
                "restaurant_images" ("restaurant_id", "url", "alt", "legend", "order")
            VALUES
                (${restaurantId}, ${url}, ${alt}, ${legend}, ${order})
            RETURNING *
        `)
	return result.rows[0]
}
