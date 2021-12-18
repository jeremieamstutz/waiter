import { query } from 'utils/db'
import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET': {
			const { query, cuisine } = req.query

			console.time('search')
			
            const restaurants = await searchRestaurants({ query, cuisine })
			const items = await searchItems({ query })

			console.timeEnd('search')

            res.status(statusCodes.ok).json({ restaurants, items })
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function searchRestaurants({ query: q, cuisine }) {
	const result = await query(
		`
        SELECT
            SIMILARITY(name, $1) + SIMILARITY(city, $1) + SIMILARITY(cuisine, $1) AS sml, *
        FROM 
            restaurants
        WHERE 
            (
                    LENGTH($1) < 1 
                OR (
                    SIMILARITY(name, $1) > 0.2 
                    OR 
                    SIMILARITY(city, $1) > 0.2 
                    OR 
                    SIMILARITY(cuisine, $1) > 0.2 
                )
            ) AND (
                LENGTH($2) < 1 OR cuisine = $2
            )
        ORDER BY 
            sml DESC, created_at DESC
        LIMIT 20`,
		[q, cuisine],
	)
	return result.rows
}

export async function searchItems({ query: q }) {
	const result = await query(
		`
        SELECT 
            SIMILARITY(items.name, $1) + SIMILARITY(items.description, $1) AS sml,
            items.*, 
            items.restaurant_id AS "restaurantId", 
            restaurants.owner_id AS "ownerId",
            items.category_id AS "categoryId",
            restaurants.name AS "restaurantName",
            restaurants.slug AS "restaurantSlug",
            categories.slug AS "categorySlug"
        FROM 
            items
        JOIN 
            restaurants ON restaurants.id = items.restaurant_id
        JOIN 
            categories ON categories.id = items.category_id
        WHERE 
            LENGTH($1) < 1 OR (
                SIMILARITY(items.name, $1) > 0.2 
                OR 
                SIMILARITY(items.description, $1) > 0.2
            )
        ORDER BY 
           sml DESC, created_at DESC
        LIMIT 20`,
		[q],
	)
	return result.rows
}
