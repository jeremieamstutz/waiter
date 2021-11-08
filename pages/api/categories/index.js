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
			console.log(req.body)

			const { category, restaurantId } = req.body

			category.slug = slugify(category.name, { lower: true })
			category.restaurant = restaurantId

			const result = await createCategory({ category })

			res.status(statusCodes.ok).json({ result })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function createCategory({ category }) {
	const { slug, name, description, restaurant} = category

	const result = await query(
		`
		INSERT INTO categories (slug, name, description, restaurant)
		VALUES ($1, $2, $3, $4)
		`,
		[slug, name, description, restaurant],
	)
	return result.rows[0]
}
