import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
	const {
		query: { userId },
		method,
	} = req

	switch (method) {
		case 'GET': {
			const user = await getUser({ userId })

			res.status(statusCodes.ok).json({ user })
			break
		}
		case 'PUT': {
			const session = await getSession({ req })

			if (session.user.id !== userId && session.user.role !== 'admin') {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			const { user } = req.body
			user.id = userId

			Object.keys(user).forEach(
				(k) => (user[k] = user[k] === '' ? null : user[k]),
			)

			const newUser = await updateUser({ user })

			res.status(statusCodes.ok).json({ user: newUser })
			break
		}
		case 'DELETE': {
			const session = await getSession({ req })

			if (session.user.id !== userId && session.user.role !== 'admin') {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			await deleteUser({ userId })

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getUser({ userId }) {
	const result = await query(
		`SELECT *
        FROM users
        WHERE id = $1`,
		[userId],
	)
	return result.rows[0]
}

export async function updateUser({ user }) {
	const { id, name, phone, birthdate, sex, image } = user
	const result = await query(
		`UPDATE users 
		SET name = $2, phone = $3, birthdate = $4, sex = $5, image = $6
		WHERE users.id = $1
        RETURNING *`,
		[id, name, phone, birthdate, sex, image],
	)
	return result.rows[0]
}

export async function deleteUser({ userId }) {
	await query(
		`DELETE FROM users 
		WHERE user.id = $1`,
		[userId],
	)
}
