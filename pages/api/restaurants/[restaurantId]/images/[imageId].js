import { getServerSession } from 'next-auth'
import AWS from 'aws-sdk'

import { query, sql } from 'utils/db'
import statusCodes from 'utils/statusCodes'
import { getRestaurant } from '..'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(req, res) {
	const {
		method,
		query: { imageId },
	} = req

	switch (method) {
		case 'GET': {
			return
		}
		case 'DELETE': {
			const session = await getServerSession(req, res, authOptions)

			if (!session) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not connected' })
			}

			const image = await getRestaurantImage(imageId)
			const restaurant = await getRestaurant({
				restaurantId: image.restaurantId,
			})

			console.log(session.user, restaurant)

			if (session.user.id !== restaurant.ownerId) {
				return res
					.status(statusCodes.forbidden)
					.json({ status: 'error', message: 'You are not the owner' })
			}

			await deleteRestaurantImage(imageId)
			const s3 = new AWS.S3({
				region: process.env.AWS_REGION,
				accessKeyId: process.env.AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			})

			const params = {
				Bucket: process.env.SPACE_BUCKET,
				Key: image.url.split('/').slice(-1)[0],
			}

			s3.deleteObject(params)

			return res.status(statusCodes.ok).json({ success: true })
		}
		default: {
			return res.status(statusCodes.methodNotAllowed).end()
		}
	}
}

export async function getRestaurantImage(imageId) {
	const result = await query(sql`
        SELECT 
            "id",
			"restaurant_id" AS "restaurantId",
			"url",
			"alt",
			"legend",
			"order",
			"status",
			"created_at" AS "createdAt",
			"updated_at" AS "updatedAt"
        FROM
            "restaurant_images"
        WHERE
            "id" = ${imageId}
    `)
	return result.rows[0]
}

export async function deleteRestaurantImage(imageId) {
	await query(sql`
        DELETE FROM
            "restaurant_images"
        WHERE
            id = ${imageId}
    `)
}
