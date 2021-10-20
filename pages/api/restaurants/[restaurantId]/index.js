import { getSession } from 'next-auth/client'
import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const {
		query: { restaurantId },
		method,
		body
	} = req

	const session = await getSession({ req })

	console.log(session, body)

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok)
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
