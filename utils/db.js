import { Pool } from 'pg'

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

export async function getAllUsers() {
	const result = await query(`SELECT id, name, email, image, created_at FROM users`)
	return result.rows
}

export async function createItem(item) {
	const result = await query(
		`
		INSERT INTO items
			(restaurant, slug, category, name, description, price, currency, image)
		VALUES
			($1, $2, $3, $4, $5, $6, $7, $8)
		`,
		[
			item.restaurant,
			item.slug,
			item.category,
			item.name,
			item.description,
			item.price,
			item.currency,
			item.image,
		],
	)
	return result.rows[0]
}

export async function getItem({ itemSlug, restaurantSlug, citySlug }) {
	const result = await query(
		`SELECT items.* FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant 
		JOIN addresses ON addresses.id = restaurants.address 
		JOIN cities ON cities.id = addresses.city 
		WHERE items.slug = $1 AND restaurants.slug = $2 AND cities.slug = $3`,
		[itemSlug, restaurantSlug, citySlug],
	)
	return result.rows[0]
}

export async function getAllItems() {
	const result = await query(`SELECT items.* FROM items`)
	return result.rows
}

export async function updateItem(item) {
	await query(
		`UPDATE items 
		SET slug = $2, name = $3, description = $4, price = $5, currency = $6, image = $7
		WHERE items.id = $1`,
		[
			item.id,
			item.slug,
			item.name,
			item.description,
			item.price,
			item.currency,
			item.image,
		],
	)
}

export async function deleteItem(id) {
	await query(
		`DELETE FROM items 
		WHERE items.id = $1`,
		[id],
	)
}

export async function getItemsSlugs() {
	const result = await query(
		`SELECT items.slug AS "itemSlug", restaurants.slug AS "restaurantSlug", cities.slug AS "citySlug" FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant 
		JOIN addresses ON addresses.id = restaurants.address 
		JOIN cities ON cities.id = addresses.city`,
	)
	return result.rows
}

export async function createCategory({ category }) {
	const result = await query(
		`
		INSERT INTO categories (name, description, restaurant)
		VALUES ($1, $2, $3)
		`,
		[category.name, category.description, category.restaurant],
	)
	return result.rows[0]
}

export async function getCategory(categoryId) {
	const result = await query(
		`
		SELECT categories.* FROM categories 
		WHERE categories.id = $1
		`,
		[categoryId],
	)
	return result.rows[0]
}

export async function updateCategory(category) {
	const result = await query(
		`
		UPDATE categories 
		SET name = $2, description = $3
		WHERE categories.id = $1
		`,
		[category.id, category.name, category.description],
	)
	return result.rows[0]
}

export async function deleteCategory(categoryId) {
	const result = await query(
		`
		DELETE FROM categories
		WHERE categories.id = $1
		`,
		[categoryId],
	)
	return result.rows[0]
}

export async function getRestaurant({ restaurantSlug, citySlug }) {
	const result = await query(
		`SELECT restaurants.*, restaurants.slug AS "restaurantSlug", cities.slug as "citySlug" FROM restaurants 
		JOIN addresses ON addresses.id = restaurants.address 
		JOIN cities ON cities.id = addresses.city 
		WHERE restaurants.slug = $1 AND cities.slug = $2`,
		[restaurantSlug, citySlug],
	)
	return result.rows[0]
}

export async function getAllRestaurants() {
	const result = await query(
		`SELECT restaurants.*, restaurants.slug AS "restaurantSlug", cities.slug as "citySlug" FROM restaurants
		JOIN addresses ON addresses.id = restaurants.address
		JOIN cities ON cities.id = addresses.city`,
	)
	return result.rows
}

export async function getRestaurantsSlugs() {
	const result = await query(
		`SELECT restaurants.slug as "restaurantSlug", cities.slug AS "citySlug" FROM restaurants 
		JOIN addresses ON addresses.id = restaurants.address 
		JOIN cities ON cities.id = addresses.city`,
	)
	return result.rows
}

export async function getRestaurantItems({ restaurantSlug, citySlug }) {
	const result = await query(
		`SELECT items.* FROM items 
		JOIN restaurants ON restaurants.id = items.restaurant 
		JOIN addresses ON addresses.id = restaurants.address 
		JOIN cities ON cities.id = addresses.city 
		WHERE restaurants.slug = $1 AND cities.slug = $2`,
		[restaurantSlug, citySlug],
	)
	return result.rows
}

export async function getRestaurantCategories({ restaurantSlug, citySlug }) {
	const result = await query(
		`SELECT categories.* FROM categories 
		JOIN restaurants ON restaurants.id = categories.restaurant 
		JOIN addresses ON addresses.id = restaurants.address 
		JOIN cities ON cities.id = addresses.city 
		WHERE restaurants.slug = $1 AND cities.slug = $2`,
		[restaurantSlug, citySlug],
	)
	return result.rows
}

export async function createLike(objectId, userId) {
	const result = await query(
		`
		INSERT INTO likes (object_id, user_id)
		values ($1, $2)`,
		[objectId, userId]
	)
	return result.rows[0]
}

export async function getLike(objectId, userId) {
	const result = await query(
		`
		SELECT * FROM likes 
		WHERE object_id = $1 AND user_id = $2`,
		[objectId, userId]
	)
	return result.rows[0]
}

export async function deleteLike(objectId, userId) {
	const result = await query(
		`
		DELETE FROM likes
		WHERE object_id = $1 AND user_id = $2`,
		[objectId, userId]
	)
	return result.rows[0]
}