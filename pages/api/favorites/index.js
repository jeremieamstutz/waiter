import statusCodes from 'utils/statusCodes'
import { getFavoriteRestaurants } from 'utils/db'
import { getSession } from 'next-auth/client'

export default async function handler(req, res) {
	const { method } = req

    const session = await getSession({ req })
	
	switch (method) {
		case 'GET':
            const restaurants = await getFavoriteRestaurants(session.user.id)
			res.status(statusCodes.ok).json({ restaurants })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
