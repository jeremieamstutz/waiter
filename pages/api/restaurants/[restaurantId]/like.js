import { getSession } from 'next-auth/client'
import { createLike, getLike, deleteLike } from 'utils/db'
import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const {
		query: { restaurantId },
		method,
		body
	} = req

	const session = await getSession({ req })

	switch (method) {
		case 'GET': {
			const result = await getLike(restaurantId, session.user.id)
			res.status(statusCodes.ok).json({ like: result ? true : false })
			break
		}
		case 'POST': {
			let result
			if (body.like) {
				result = await createLike(restaurantId, session.user.id)
			} else {
				result = await deleteLike(restaurantId, session.user.id)
			}
			res.status(statusCodes.ok).json(result)
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
