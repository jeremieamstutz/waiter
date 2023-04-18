import { getServerSession } from 'next-auth'

import { Feedback } from 'db/models'

import statusCodes from 'utils/statusCodes'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	const { method, body } = req

	const session = await getServerSession(req, res, authOptions)

	switch (method) {
		case 'GET': {
			if (session?.user?.role !== 'admin') {
				return res
					.status(statusCodes.forbidden)
					.json({ status: 'error', message: 'You are not an admin' })
			}

			const feedbacks = await Feedback.findAll({
				include: ['user'],
			})
			return res.status(statusCodes.ok).json(feedbacks)
		}

		case 'POST': {
			if (!session) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not connected' })
			}

			const feedback = body
			feedback.userId = session.user.id
			const createdFeedback = await Feedback.create(feedback)

			return res.status(statusCodes.ok).json(createdFeedback)
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
