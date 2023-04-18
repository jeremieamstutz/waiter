import slugify from 'slugify'
import axios from 'axios'

import { query, sql } from 'utils/db'
import statusCodes from 'utils/statusCodes'

import { Restaurant } from 'db/models'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			const restaurants = await Restaurant.findAll({
				include: ['address', 'images'],
			})
			res.status(statusCodes.ok).json({ restaurants })
			break
		case 'POST':
			const { restaurant } = req.body

			const session = await getServerSession(req, res, authOptions)

			restaurant.slug = slugify(restaurant.name, {
				lower: true,
				remove: /[*+~.()'"!:@]/g,
			})

			const existingRestaurant = await Restaurant.findOne({
				where: { slug: restaurant.slug },
			})

			if (existingRestaurant) {
				res.status(statusCodes.badRequest).json({
					error: 'Existing slug',
				})
			}

			restaurant.ownerId = session.user.id

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

			const createdRestaurant = await Restaurant.create(
				{
					slug: restaurant.slug,
					status: 'hidden',
					name: restaurant.name,
					slogan: restaurant.slogan,
					description: restaurant.description,
					phone: restaurant.phone,
					email: restaurant.email,
					website: restaurant.website,
					currency: 'CHF',
					allowBooking: true,
					address: {
						street: restaurant.street,
						streetNumber: restaurant.streetNumber,
						postalCode: restaurant.postalCode,
						city: restaurant.city,
						region: restaurant.region,
						country: restaurant.country,
						coordinates: [coordinates.lat, coordinates.lng],
					},
				},
				{
					include: ['address'],
				},
			)

			res.status(statusCodes.ok).json(createdRestaurant)
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function createRestaurant({ restaurant }) {
	const {
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
        INSERT INTO restaurants
			(slug, owner_id, image, name, description, cuisine, phone, website, address, street, street_number, postal_code, city, region, country, latitude, longitude)
		VALUES
			($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
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

export async function getAllRestaurants() {
	const result = await query(
		`SELECT 
			id,
			slug, 
			owner_id AS "ownerId",
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
			created_at AS "createdAt",
			updated_at AS "updatedAt"
		FROM restaurants
        ORDER BY created_at DESC`,
	)
	let restaurants = result.rows

	restaurants = await Promise.all(
		restaurants.map(async (restaurant) => ({
			...restaurant,
			images: await getAllRestaurantImages(restaurant.id),
		})),
	)

	return restaurants
}

export async function getAllRestaurantSlugs() {
	const result = await query(
		sql`SELECT 
				"slug" AS "restaurantSlug"
			FROM 
				"restaurants"
        	ORDER BY 
				"created_at" DESC`,
	)
	return result.rows
}
