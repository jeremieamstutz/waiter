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
			newRestaurant.slug = slugify(restaurant.name, {
				lower: true,
				remove: /[*+~.()'"!:@]/g,
			})
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
	const {
		id,
		slug,
		ownerId,
		image,
		name,
		description,
		cuisine,
		phone,
		website,
		address,
		street,
		streetNumber,
		postalCode,
		city,
		region,
		country,
		latitude,
		longitude,
	} = restaurant
	const result = await query(
		`
        UPDATE restaurants
		SET 
			slug = $2, 
			owner_id = $3, 
			image = $4, 
			name = $5, 
			description = $6, 
			cuisine = $7, 
			phone = $8,
			website = $9,
			address = $10, 
			street = $11, 
			street_number = $12, 
			postal_code = $13, 
			city = $14, 
			region = $15, 
			country = $16, 
			latitude = $17, 
			longitude = $18, 
			updated_at = CURRENT_TIMESTAMP
		WHERE restaurants.id = $1
        RETURNING 
			id,
			slug, 
			owner_id AS "ownerId", 
			image,
			name,
			description,
			cuisine,
			phone,
			website,
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
			id,
			slug,
			ownerId,
			image,
			name,
			description,
			cuisine,
			phone,
			website,
			address,
			street,
			streetNumber,
			postalCode,
			city,
			region,
			country,
			latitude,
			longitude,
		],
	)
	return result.rows[0]
}

export async function markRestaurantAsUpdated({ restaurantId }) {
	await query(
		`
		UPDATE restaurants
		SET updated_at = CURRENT_TIMESTAMP
		WHERE restaurants.id = $1`,
		[restaurantId],
	)
}

export async function getRestaurant({ restaurantSlug, restaurantId }) {
	if (restaurantId) {
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
				website,
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
			WHERE id = $1`,
			[restaurantId],
		)
		return result.rows[0]
	}

	if (restaurantSlug) {
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
				website,
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
			WHERE slug = $1`,
			[restaurantSlug],
		)
		return result.rows[0]
	}
	return
}

export async function getRestaurantItems({ restaurantId }) {
	const result = await query(
		`SELECT 
			items.*, 
			items.restaurant_id AS "restaurantId", 
			restaurants.owner_id AS "ownerId", 
			items.category_id AS "categoryId",
			restaurants.slug AS "restaurantSlug",
			categories.slug AS "categorySlug" FROM items
		JOIN 
			restaurants ON restaurants.id = items.restaurant_id
		JOIN 
			categories ON categories.id = items.category_id
		WHERE 
			items.restaurant_id = $1`,
		[restaurantId],
	)
	return result.rows
}

export async function getRestaurantCategories({ restaurantId }) {
	const result = await query(
		`SELECT categories.* FROM categories
		WHERE categories.restaurant_id = $1`,
		[restaurantId],
	)
	return result.rows
}
