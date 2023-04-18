import { query, sql } from 'utils/db'
import statusCodes from 'utils/statusCodes'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(req, res) {
	const {
		method,
		query: { flagId },
		body,
	} = req

	switch (method) {
		case 'GET': {
			const flag = await getFlag(flagId)
			return res.status(200).json(flag)
		}
		case 'POST': {
			const session = await getServerSession(req, res, authOptions)

			if (session?.user?.role === 'admin') {
				const flag = body
				const newFlag = await updateFlag(flagId, flag)
				return res.status(statusCodes.ok).json(newFlag)
			} else {
				return res
					.status(statusCodes.forbidden)
					.json({ status: 'error', message: 'You are not an admin' })
			}
		}
		case 'DELETE': {
			const session = await getServerSession(req, res, authOptions)

			if (session?.user?.role === 'admin') {
				await deleteFlag(flagId)
				return res.status(statusCodes.ok).json({ success: true })
			} else {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not an admin' })
			}
		}
		default: {
			res.status(statusCodes.methodNotAllowed).end()
			break
		}
	}
}

export async function getFlag(flagId) {
	const result = await query(
		sql`SELECT
            *
        FROM
            flags
        WHERE
            id = ${flagId}`,
	)
	return result.rows[0]
}

export async function updateFlag(flagId, flag) {
	const result = await query(
		sql`UPDATE
            flags
        SET
            enabled = ${flag.enabled}
        WHERE
            id = ${flagId}
		RETURNING *`,
	)
	return result.rows[0]
}

export async function deleteFlag(flagId) {
	await query(
		sql`DELETE FROM 
            flags
        WHERE
            id = ${flagId}`,
	)
}
