import { query } from 'utils/db'

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
		case 'GET':
			let flags = await getAllFlags()
			flags = flags.reduce(
				(obj, item) => ({
					...obj,
					[item.key]: item.enabled,
				}),
				{},
			)
			res.status(200).json(flags)
			break
		case 'POST':
			// console.log(body)
			// const { flag } = body
			// await createFlag(flag)
			// res.status(200).end()

			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

// export async function createFlag({ key, description, environment, enabled }) {
// 	await query(
// 		`INSERT INTO
//             flags (key, description, environment, enabled)
//         VALUES
//             ($1, $2, $3, $4)`,
// 		[key, description, environment, enabled],
// 	)
// }

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
