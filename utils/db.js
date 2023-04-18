import { Pool, types } from 'pg'

// Return date as String
types.setTypeParser(1082, (value) => value)

let pool

if (!pool) {
	pool = new Pool({
		connectionString: process.env.DATABASE_URL,
		max: 5,
		// ssl:
		// 	process.env.NODE_ENV === 'production'
		// 		? {
		// 				rejectUnauthorized: false,
		// 		  }
		// 		: undefined,
	})
}

export async function query() {
	try {
		const start = Date.now()
		const client = await pool.connect()
		let query

		if (typeof arguments[0] === 'object') {
			query = arguments[0]
		} else {
			query = namedParams(arguments[0], arguments[1])
		}

		query.text = query.text
			.replace(/(\r\n|\n|\r)/gm, '')
			.replace(/\s\s+/g, ' ')

		const result = await client.query(query)
		await client.release()

		const duration = Date.now() - start

		// console.log({
		// 	...query,
		// 	duration: duration + 'ms',
		// 	rows: result.rowCount,
		// })

		return result
	} catch (error) {
		console.log(error)
	}
}

// Inspired by https://github.com/felixfbecker/node-sql-template-strings
export function sql(strings, ...exps) {
	let text = strings.reduce((prev, curr, i) => prev + '$' + i + curr)
	let values = exps

	return { text, values }
}

// https://github.com/pihvi/yesql
function namedParams(string = '', data = []) {
	if (Array.isArray(data)) {
		return {
			text: string,
			values: data,
		}
	}

	let values = []
	let text = string.replace(/(::?)([a-zA-Z0-9_]+)/g, (match, prefix, key) => {
		if (prefix !== ':') {
			return prefix + key
		} else if (key in data) {
			values.push(data[key])
			return '$' + values.length
		} else {
			values.push(null)
			return '$' + values.length
		}
	})
	return { text, values }
}
