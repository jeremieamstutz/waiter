import statusCodes from 'utils/statusCodes'
import { updateItem, deleteItem } from 'utils/db'
import slugify from 'slugify'

export default async function handler(req, res) {
	const {
		query: { itemId },
		method,
	} = req

	switch (method) {
		case 'PUT':
			const newItem = req.body
			newItem.slug = slugify(newItem.name, { lower: true })
			newItem.category = '890be6ae-8b2c-4150-bb99-0716e6cef54a'
			
            await updateItem(itemId, newItem)

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		case 'DELETE':
            await deleteItem(itemId)
			
            res.status(statusCodes.ok).json({ status: 'success' })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
