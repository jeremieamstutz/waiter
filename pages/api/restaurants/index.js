import { getSession } from 'next-auth/react'
import slugify from 'slugify'
import axios from 'axios'

import { query } from 'utils/db'
import statusCodes from 'utils/statusCodes'
import { getRestaurant } from './[restaurantId]'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			const restaurants = await getAllRestaurants()
			res.status(statusCodes.ok).json({ restaurants })
			break
		case 'POST':
			const { restaurant } = req.body

			const session = await getSession({ req })

			restaurant.slug = slugify(restaurant.name, {
				lower: true,
				remove: /[*+~.()'"!:@]/g,
			})

			const existingRestaurant = await getRestaurant({
				restaurantSlug: restaurant.slug,
			})

			if (existingRestaurant) {
				res.status(statusCodes.badRequest).json({
					error: 'Existing slug',
				})
			}

			restaurant.ownerId = session.user.id

			restaurant.address = `${restaurant.street} ${restaurant.streetNumber}, ${restaurant.postalCode} ${restaurant.city}, ${restaurant.country}`

			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					restaurant.address,
				)}&key=${process.env.GOOGLE_API_KEY}`,
			)
			const data = response.data

			if (!data || data.status === 'ZERO_RESULTS') {
				res.status(statusCodes.badRequest).json({
					error: 'Address not found',
				})
			}

			const coordinates = data.results[0].geometry.location

			restaurant.latitude = coordinates.lat
			restaurant.longitude = coordinates.lng

			const newRestaurant = await createRestaurant({ restaurant })

			res.status(statusCodes.ok).json({ restaurant: newRestaurant })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function createRestaurant({ restaurant }) {
	const result = await query(
		`
        INSERT INTO restaurants
			(slug, owner_id, image, name, description, cuisine, phone, address, street, street_number, postal_code, city, region, country, latitude, longitude)
		VALUES
			($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING 
			id,
			slug, 
			owner_id AS "ownerId", 
			image,
			name,
			description,
			cuisine
			phone,
			address,
			street,
			street_number AS "streetNumber", 
			postal_code AS "postalCode",
			city,
			region,
			country,
			latitude,
			longitude,
			created_at AS "createdAt",
			updated_at AS "updatedAt"
    `,
		[
			restaurant.slug,
			restaurant.ownerId,
			restaurant.image,
			restaurant.name,
			restaurant.description,
			restaurant.cuisine,
			restaurant.phone,
			restaurant.address,
			restaurant.street,
			restaurant.streetNumber,
			restaurant.postalCode,
			restaurant.city,
			restaurant.region,
			restaurant.country,
			restaurant.latitude,
			restaurant.longitude,
		],
	)
	return result.rows[0]
}

export async function getAllRestaurants() {
	const result = await query(
		`SELECT 
			id,
			slug, 
			owner_id AS "ownerId", 
			image,
			name,
			description,
			cuisine
			phone,
			address,
			street,
			street_number AS "streetNumber", 
			postal_code AS "postalCode",
			city,
			region,
			country,
			latitude,
			longitude,
			created_at AS "createdAt",
			updated_at AS "updatedAt"
		FROM restaurants
        ORDER BY created_at DESC`,
	)
	return result.rows
}
