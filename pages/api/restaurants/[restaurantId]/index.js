import axios from 'axios'
import { getSession } from 'next-auth/react'
import slugify from 'slugify'

import { query } from 'utils/db'
import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const {
		query: { restaurantId },
		method,
		body,
	} = req

	const session = await getSession({ req })

	switch (method) {
		case 'GET': {
			const restaurant = await getRestaurant({ restaurantId })
			res.status(statusCodes.ok).json({ restaurant })
			break
		}
		case 'PUT':
			const { restaurant } = req.body

			const session = await getSession({ req })

			restaurant.id = restaurantId
			restaurant.slug = slugify(restaurant.name, { lower: true })
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

			const newRestaurant = await updateRestaurant({ restaurant })

			res.status(statusCodes.ok).json({ restaurant: newRestaurant })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function updateRestaurant({ restaurant }) {
	const result = await query(
		`
        UPDATE restaurants
		SET slug = $2, owner_id = $3, image = $4, name = $5, description = $6, cuisine = $7, phone = $8, address = $9, street = $10, street_number = $11, postal_code = $12, city = $13, region = $14, country = $15, latitude = $16, longitude = $17
		WHERE restaurants.id = $1
        RETURNING *
    `,
		[
			restaurant.id,
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

export async function getRestaurant({ restaurantSlug, restaurantId }) {
	if (restaurantId) {
		const result = await query(
			`SELECT *, restaurants.slug AS "restaurantSlug", street_number AS "streetNumber", postal_code AS "postalCode" FROM restaurants 
			WHERE restaurants.id = $1`,
			[restaurantId],
		)
		return result.rows[0]
	}

	if (restaurantSlug) {
		const result = await query(
			`SELECT *, restaurants.slug AS "restaurantSlug", street_number AS "streetNumber", postal_code AS "postalCode" FROM restaurants 
			WHERE restaurants.slug = $1`,
			[restaurantSlug],
		)
		return result.rows[0]
	}
	return
}

export async function getRestaurantItems({ restaurantSlug }) {
	const result = await query(
		`SELECT items.* FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant_id  
		WHERE restaurants.slug = $1`,
		[restaurantSlug],
	)
	return result.rows
}

export async function getRestaurantCategories({ restaurantSlug }) {
	const result = await query(
		`SELECT categories.* FROM categories 
		JOIN restaurants ON restaurants.id = categories.restaurant 
		WHERE restaurants.slug = $1`,
		[restaurantSlug],
	)
	return result.rows
}
