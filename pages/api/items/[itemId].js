import statusCodes from 'utils/statusCodes'
import slugify from 'slugify'
import { getServerSession } from 'next-auth/next'
import { markRestaurantAsUpdated } from 'pages/api/restaurants/[restaurantId]'
import { Item } from 'db/models'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	const {
		query: { itemId },
		method,
	} = req

	switch (method) {
		case 'PUT': {
			const session = await getServerSession(req, res, authOptions)
			const oldItem = await Item.findOne({ where: { id: itemId } })

			if (
				session.user.id !== oldItem.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			const item = req.body

			if (item.name) {
				item.slug = slugify(item.name, {
					lower: true,
					remove: /[*+~.()'"!:@]/g,
				})
			}

			const result = await Item.update(
				{
					...item,
				},
				{
					where: { id: itemId },
					returning: true,
				},
			)

			res.status(statusCodes.ok).json({ item: result[1] })
			break
		}
		case 'DELETE': {
			const session = await getServerSession(req, res, authOptions)
			const item = await Item.findOne({ where: { id: itemId } })
			if (
				session.user.id !== item.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			await deleteItem({ itemId })
			await markRestaurantAsUpdated({ restaurantId: item.restaurantId })

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
