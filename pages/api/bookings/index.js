import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextauth]'

import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET': {
			return
		}
		case 'POST': {
			const session = await getServerSession(req, res, authOptions)

			const booking = req.body

			return res.status(statusCodes.ok).json({})
		}

		default: {
			return res.status(statusCodes.methodNotAllowed).end()
		}
	}
}
