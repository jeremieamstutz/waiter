import { query, sql } from 'utils/db'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			const users = await getAllUsers()
			res.status(statusCodes.ok).json(users)
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getAllUsers() {
	const result = await query(
		sql`SELECT 
				"id",
				"slug",
				"first_name" AS "firstName",
				"last_name" AS "lastName",
				"email",
				"phone",
				"role",
				"image",
				"gender",
				"birthdate",
				"created_at" AS "createdAt",
				"updated_at" AS "updatedAt"
			FROM 
				"users" 
			ORDER BY 
				"created_at"`,
	)
	return result.rows
}
