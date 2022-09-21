import pg from 'pg'
const { Pool, types } = pg
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { getPlaiceholder } from 'plaiceholder'
dotenv.config()

types.setTypeParser(1082, (value) => value)

let pool

if (!pool) {
	pool = new Pool({
		// connectionString: process.env.DATABASE_URL,
		connectionString:
			'postgres://wljmdibvoxmcey:e8b359a0c3f6207781cc992aee8d26986b18a4e36ef5964083cd8e29eb2e7f17@ec2-54-72-155-238.eu-west-1.compute.amazonaws.com:5432/d26ud75pmvi5cc',
		max: 5,
		ssl: {
			rejectUnauthorized: false,
		},
	})
}

export async function query(text, values) {
	try {
		const client = await pool.connect()
		const result = await client.query(text, values)
		await client.release()
		return result
	} catch (error) {
		console.log(error)
	}
}

async function main() {
	const result = await query(`SELECT * FROM items`)
	const items = result.rows

	for (let [index, item] of items.entries()) {
		console.log(`Item ${index} of ${items.length}`)
		if (item.image) {
			const { base64 } = await getPlaiceholder(item.image, {
				size: 8,
				brightness: 1.2,
				saturation: 1.3,
			})
			await query(`UPDATE items SET blur = $2 WHERE id = $1`, [
				item.id,
				base64,
			])
			console.log(base64)
		}
	}
}

main()
