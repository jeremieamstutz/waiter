import statusCodes from 'utils/statusCodes'
import { updateCategory, deleteCategory, getCategory } from 'utils/db'

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
			const category = req.body
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
