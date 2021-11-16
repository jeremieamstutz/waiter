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

	

	switch (method) {
		case 'GET': {
			const restaurant = await getRestaurant({ restaurantId })
			res.status(statusCodes.ok).json({ restaurant })
			break
		}
		case 'PUT':
			const session = await getSession({ req })
			const restaurant = await getRestaurant({
				restaurantId,
			})

			if (
				session.user.id !== restaurant.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			let { restaurant: newRestaurant } = req.body
			newRestaurant.id = restaurantId
			newRestaurant.slug = slugify(restaurant.name, { lower: true })
			newRestaurant.ownerId = session.user.id
			newRestaurant.address = `${newRestaurant.street} ${newRestaurant.streetNumber}, ${newRestaurant.postalCode} ${newRestaurant.city}, ${newRestaurant.country}`

			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					newRestaurant.address,
				)}&key=${process.env.GOOGLE_API_KEY}`,
			)
			const data = response.data
			if (!data || data.status === 'ZERO_RESULTS') {
				res.status(statusCodes.badRequest).json({
					error: 'Address not found',
				})
			}
			const coordinates = data.results[0].geometry.location
			newRestaurant.latitude = coordinates.lat
			newRestaurant.longitude = coordinates.lng

			newRestaurant = await updateRestaurant({
				restaurant: newRestaurant,
			})

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
			`SELECT *, slug AS "restaurantSlug", owner_id AS "ownerId", street_number AS "streetNumber", postal_code AS "postalCode" 
			FROM restaurants 
			WHERE id = $1`,
			[restaurantId],
		)
		return result.rows[0]
	}

	if (restaurantSlug) {
		const result = await query(
			`SELECT *, slug AS "restaurantSlug", owner_id AS "ownerId", street_number AS "streetNumber", postal_code AS "postalCode" 
			FROM restaurants 
			WHERE slug = $1`,
			[restaurantSlug],
		)
		return result.rows[0]
	}
	return
}

export async function getRestaurantItems({ restaurantSlug }) {
	const result = await query(
		`SELECT items.*, items.category_id AS "categoryId" FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant_id  
		WHERE restaurants.slug = $1`,
		[restaurantSlug],
	)
	return result.rows
}

export async function getRestaurantCategories({ restaurantSlug }) {
	const result = await query(
		`SELECT categories.* FROM categories 
		JOIN restaurants ON restaurants.id = categories.restaurant_id
		WHERE restaurants.slug = $1`,
		[restaurantSlug],
	)
	return result.rows
}
