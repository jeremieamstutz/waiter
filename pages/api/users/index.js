import { query } from 'utils/db'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			const users = await getAllUsers()
			res.status(statusCodes.ok).json({ users })
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getAllUsers() {
	const result = await query(
		`SELECT id, name, email, image, created_at FROM users`,
	)
	return result.rows
}
