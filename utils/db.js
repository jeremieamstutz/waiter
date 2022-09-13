import { Client, Pool, types } from 'pg'

// Return date as String
types.setTypeParser(1082, (value) => value)

let pool

if (!pool) {
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		max: 5,
		ssl:
			process.env.NODE_ENV === 'production'
				? {
						rejectUnauthorized: false,
				  }
				: undefined,
	})
}

export async function query(text, values) {
	try {
		// const start = Date.now()

		const client = await pool.connect()
		const result = await client.query(text, values)
		await client.release()

		// const duration = Date.now() - start

		// console.log('Query: ', {
		// 	text,
		// 	values,
		// 	duration,
		// 	rows: result.rowCount,
		// })
		
		return result
	} catch (error) {
		console.log(error)
	}
}
