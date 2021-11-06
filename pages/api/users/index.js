import { query} from 'utils/db'

export async function getAllUsers() {
	const result = await query(
		`SELECT id, name, email, image, created_at FROM users`,
	)
	return result.rows
}