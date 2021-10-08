import ItemList from 'components/item/item-list'
import * as db from 'utils/db'

export default function ItemsPage({ items, categories }) {
	return categories.map((category, index) => (
		<ItemList
			key={index}
			category={category}
			items={items.filter((item) => item.category === category.id)}
		/>
	))
}

import { performance } from 'perf_hooks'

export async function getServerSideProps() {
	let startTime = performance.now()
	// const client = await db.connect()
	// let query = await client.query('SELECT * FROM items')
	// const items = query.rows
	// query = await client.query('SELECT * FROM categories')
	// const categories = query.rows
	// query = await client.query(
	// 	`SELECT * FROM restaurants WHERE restaurants.id = '${items[0].restaurant}'`,
	// )
	// const restaurant = query.rows
	// await client.release()
	let query = await db.query('SELECT * FROM items')
	const items = query.rows
    console.log(items)
	// query = await db.query('SELECT * FROM categories')
	// const categories = query.rows
	// query = await db.query(`SELECT * FROM restaurants WHERE restaurants.id = '${items[0].restaurant}'`)
	// const restaurant = query.rows
	// let query = await db.query(
	// 	'SELECT * FROM items JOIN categories ON categories.id = items.category JOIN restaurants ON restaurants.id = items.restaurant',
	// )
	// const query = {
	//     text: 'INSERT INTO users(name, email) VALUES($1, $2)',
	//     values: ['brianc', 'brian.m.carlson@gmail.com'],
	//   }
	// let query = await db.query(
	// 	'SELECT json_agg(restaurants) AS restaurant, json_agg(categories) AS categories, json_agg(items) AS items FROM items JOIN categories ON categories.id = items.category JOIN restaurants ON restaurants.id = items.restaurant GROUP BY restaurants.id GROUP BY categories.id',
	// )
	console.log(query.rows[0])
	// console.log(items),
	// console.log(categories)
	// console.log(restaurant)

	// let allpost = knex
	//     .select([
	//         'questions.id',
	//         'question.content',
	//         knex.raw('json_agg(v.*) as votes')
	//     ])
	//     .from('questions')
	//     .leftJoin('votes as v', 'questions.id', 'v.question_id')
	//     .groupBy('questions.id');
	var endTime = performance.now()

	console.log(
		`Call to doSomething took ${(endTime - startTime).toFixed(
			0,
		)} milliseconds`,
	)
	return {
		props: {
			items: [],
			categories: [],
		},
	}
}
