import { getServerSession } from 'next-auth'

import { Flag } from 'db/models'
import { query } from 'utils/db'
import sleep from 'utils/sleep'
import statusCodes from 'utils/statusCodes'

import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
		case 'GET': {
			const flags = await Flag.findAll({ order: ['key'] })
			return res.status(200).json(flags)
		}
		case 'POST': {
			const session = await getServerSession(req, res, authOptions)

			if (!session) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not connected' })
			}

			if (session.user?.role !== 'admin') {
				return res
					.status(statusCodes.forbidden)
					.json({ status: 'error', message: 'You are not an admin' })
			}

			const flag = body
			await Flag.create(flag)

			return res.status(statusCodes.ok).end()
		}
		default: {
			return res.status(statusCodes.methodNotAllowed).end()
		}
	}
}

export async function createFlag(flag) {
	const { key, enabled } = flag

	const result = await query(
		`INSERT INTO flags
			(key, enabled)
		VALUES
			($1, $2)
		RETURNING *`,
		[key, enabled],
	)
	return result.rows[0]
}

export async function getAllFlags() {
	const result = await query(
		`SELECT
            *
        FROM
            flags
		ORDER BY
			key`,
	)
	return result.rows
}
