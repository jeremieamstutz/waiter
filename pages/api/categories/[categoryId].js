import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'

export default async function handler(req, res) {
	const {
		query: { categoryId },
		method,
	} = req

	switch (method) {
		case 'GET': {
			const category = await getCategory(categoryId)
			res.status(statusCodes.ok).json({ category })
			break
		}
		case 'PUT': {
			const { category } = req.body
			category.id = categoryId

			await updateCategory(category)

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		}
		case 'DELETE': {
			await deleteCategory(categoryId)

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		}
		default: {
			res.status(statusCodes.methodNotAllowed).end()
			break
		}
	}
}

export async function getCategory(categoryId) {
	const result = await query(
		`
		SELECT categories.* FROM categories 
		WHERE categories.id = $1
		`,
		[categoryId],
	)
	return result.rows[0]
}

export async function updateCategory(category) {
	const result = await query(
		`
		UPDATE categories 
		SET name = $2, description = $3
		WHERE categories.id = $1
		`,
		[category.id, category.name, category.description],
	)
	return result.rows[0]
}

export async function deleteCategory(categoryId) {
	const result = await query(
		`
		DELETE FROM categories
		WHERE categories.id = $1
		`,
		[categoryId],
	)
	return result.rows[0]
}