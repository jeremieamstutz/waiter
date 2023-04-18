import { getServerSession } from 'next-auth'
import axios from 'axios'
import slugify from 'slugify'

import { Restaurant } from 'db/models'

import { query, sql } from 'utils/db'
import sleep from 'utils/sleep'
import statusCodes from 'utils/statusCodes'
import { getAllRestaurantImages } from './images'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function handler(req, res) {
	const {
		query: { restaurantId },
		method,
		body,
	} = req

	switch (method) {
		case 'GET': {
			const restaurant = await Restaurant.findOne({
				where: { id: restaurantId },
				include: ['address', 'images', 'categories', 'items'],
				order: [
					['images', 'id', 'ASC'],
					['categories', 'id', 'ASC'],
					['items', 'id', 'ASC'],
				],
			})

			res.status(statusCodes.ok).json(restaurant)
			break
		}
		case 'PUT': {
			const session = await getServerSession(req, res, authOptions)

			if (!session) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not connected' })
			}

			const restaurant = await Restaurant.findOne({
				where: {
					id: restaurantId,
				},
			})

			if (
				session.user.id !== restaurant.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not the owner' })
			}

			let newRestaurant = {
				...restaurant,
				...body,
			}

			newRestaurant.slug = slugify(restaurant.name, {
				lower: true,
				remove: /[*+~.()'"!:@]/g,
			})

			const address = `${newRestaurant.street} ${newRestaurant.streetNumber}, ${newRestaurant.postalCode} ${newRestaurant.city}, ${newRestaurant.country}`

			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
					address,
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

			newRestaurant = await updateRestaurant(newRestaurant)

			return res.status(statusCodes.ok).json(newRestaurant)
		}
		default: {
			res.status(statusCodes.methodNotAllowed).end()
			break
		}
	}
}

export async function updateRestaurant(restaurant) {
	const {
		id,
		slug,
		ownerId,
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
		sql`UPDATE restaurants
			SET 
			slug = ${slug}, 
			owner_id = ${ownerId}, 
			name = ${name}, 
			description = ${description}, 
			cuisine = ${cuisine}, 
			phone = ${phone},
			website = ${website},
			address = ${address}, 
			street = ${street}, 
			street_number = ${streetNumber}, 
			postal_code = ${postalCode}, 
			city = ${city}, 
			region = ${region}, 
			country = ${country}, 
			latitude = ${latitude}, 
			longitude = ${longitude}, 
			updated_at = CURRENT_TIMESTAMP
		WHERE id = ${id}
        RETURNING 
			id,
			slug, 
			owner_id AS "ownerId",
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
	)
	return result.rows[0]
}

export async function markRestaurantAsUpdated({ restaurantId }) {
	await query(
		sql`UPDATE restaurants
			SET updated_at = CURRENT_TIMESTAMP
			WHERE restaurants.id = ${restaurantId}`,
	)
}

export async function getRestaurant({ restaurantSlug, restaurantId }) {
	let restaurant
	if (restaurantId) {
		const result = await query(
			`SELECT 
				id,
				slug, 
				owner_id AS "ownerId",
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
		restaurant = result.rows[0]
	}

	if (restaurantSlug) {
		const result = await query(
			`SELECT
				id,
				slug, 
				owner_id AS "ownerId", 
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
		restaurant = result.rows[0]
	}

	if (!restaurant) return null

	restaurant.images = await getAllRestaurantImages(restaurant.id)
	return restaurant
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
