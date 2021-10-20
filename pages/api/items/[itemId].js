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
			const item = req.body
			item.id = itemId
			item.slug = slugify(item.name, { lower: true })
			
            await updateItem(item)

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
