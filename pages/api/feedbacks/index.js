import { getSession } from 'next-auth/react'
import { query, sql } from 'utils/db'
import statusCodes from 'utils/statusCodes'
import { getUser } from '../users/[userId]'

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
		case 'GET': {
			const session = await getSession({ req })

			if (session?.user?.role !== 'admin') {
				return res
					.status(statusCodes.forbidden)
					.json({ status: 'error', message: 'You are not an admin' })
			}

			const feedbacks = await getAllFeedbacks()
			return res.status(statusCodes.ok).json(feedbacks)
		}

		case 'POST': {
			const session = await getSession({ req })

			if (!session) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not connected' })
			}

			const feedback = body
			feedback.userId = session.user.id
			const savedFeedback = await createFeedback(feedback)

			return res.status(statusCodes.ok).json(savedFeedback)
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function createFeedback(feedback) {
	const { emotion, message, url, userId } = feedback
	const result = await query(
		sql`INSERT INTO
				feedbacks (emotion, message, url, user_id)
			VALUES
				(${emotion}, ${message}, ${url}, ${userId})
			RETURNING *`,
	)
	return result.rows[0]
}

export async function getAllFeedbacks() {
	const result = await query(
		sql`SELECT
				feedbacks.*,
				feedbacks.user_id as "userId",
				feedbacks.created_at as "createdAt"
			FROM
				feedbacks`,
	)

	let feedbacks = result.rows

	feedbacks = await Promise.all(
		feedbacks.map(async (feedback) => ({
			...feedback,
			user: await getUser(feedback.userId),
		})),
	)

	return feedbacks
}
