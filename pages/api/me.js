import { getServerSession } from 'next-auth'

import { authOptions } from './auth/[...nextauth]'

import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET': {
			const { user } = await getServerSession(req, res, authOptions)

			return res.status(statusCodes.ok).json(user)
		}
		default: {
			return res.status(statusCodes.methodNotAllowed).end()
		}
	}
}
