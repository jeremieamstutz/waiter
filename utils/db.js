import { Pool, types } from 'pg'

// Return date as String
types.setTypeParser(1082, value => value)

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
})

export async function query(text, values) {
	try {
		const start = Date.now()
		const result = await pool.query(text, values)
		const duration = Date.now() - start
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

export async function getClient() {
	const client = await pool.connect()
	const query = client.query
	const release = client.release
	const timeout = setTimeout(() => {
		console.error('A client has been checked out for more than 5 seconds!')
		console.error(
			`The last executed query on this client was: ${client.lastQuery}`,
		)
	}, 5000)
	client.query = (...args) => {
		client.lastQuery = args
		return query.apply(client, args)
	}
	client.release = () => {
		clearTimeout(timeout)
		client.query = query
		client.release = release
		return release.apply(client)
	}
	return client
}