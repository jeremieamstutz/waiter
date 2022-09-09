import { query } from 'utils/db'

export default async function handler(req, res) {
	const {
		method,
		query: { key },
		body,
	} = req

	switch (method) {
		case 'GET':
			const flag = await getFlag(key)
			res.status(200).json(flag)
			break

		case 'POST':
			const { action } = body

			switch (action) {
				case 'ENABLE':
					await enableFlag(key)
					res.status(200).end()
					break
				case 'DISABLE':
					await disableFlag(key)
					res.status(200).end()
					break
				default:
					res.status(200).end()
					break
			}
			break

		case 'DELETE':
			await deleteFlag(key)
			res.status(200).end()
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getFlag(key) {
	const result = await query(
		`SELECT
            *
        FROM
            flags
        WHERE
            key = $1`,
		[key],
	)
	return result.rows[0]
}

export async function deleteFlag(key) {
	await query(
		`DELETE FROM 
            flags
        WHERE
            key = $1`,
		[key],
	)
}

export async function enableFlag(key) {
	await query(
		`UPDATE
            flags
        SET
            enabled = TRUE
        WHERE
            key = $1`,
		[key],
	)
}

export async function disableFlag(key) {
	await query(
		`UPDATE
            flags
        SET
            enabled = FALSE
        WHERE
            key = $1`,
		[key],
	)
}
