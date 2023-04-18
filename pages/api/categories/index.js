import { getServerSession } from 'next-auth'
import slugify from 'slugify'

import { authOptions } from '../auth/[...nextauth]'
import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			return res.status(statusCodes.ok).json({ status: 'success' })
		case 'POST':
			const { category } = req.body

			const session = await getServerSession(req, res, authOptions)
			const restaurant = await getRestaurant({
				restaurantId: category.restaurantId,
			})

			if (
				session.user.id !== restaurant.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			category.slug = slugify(category.name, {
				lower: true,
				remove: /[*+~.()'"!:@]/g,
			})

			const newCategory = await createCategory({ category })
			await markRestaurantAsUpdated({
				restaurantId: category.restaurantId,
			})

			return res.status(statusCodes.ok).json({ category: newCategory })
		default:
			return res.status(statusCodes.methodNotAllowed).end()
	}
}

export async function createCategory({ category }) {
	const { slug, name, description, restaurantId } = category

	const result = await query(
		`
		INSERT INTO categories (slug, name, description, restaurant_id)
		VALUES ($1, $2, $3, $4)
		`,
		[slug, name, description, restaurantId],
	)
	return result.rows[0]
}
