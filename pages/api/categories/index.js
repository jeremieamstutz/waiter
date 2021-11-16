import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'
import slugify from 'slugify'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'POST':
			const { category } = req.body

			const session = await getSession({ req })
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

			category.slug = slugify(category.name, { lower: true })

			const newCategory = await createCategory({ category })

			res.status(statusCodes.ok).json({ category: newCategory })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
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
