import { getSession } from 'next-auth/react'
import slugify from 'slugify'

import statusCodes from 'utils/statusCodes'
import { query } from 'utils/db'

export default async function handler(req, res) {
	const {
		query: { categoryId },
		method,
	} = req

	switch (method) {
		case 'GET': {
			const category = await getCategory({ categoryId })
			res.status(statusCodes.ok).json({ category })
			break
		}
		case 'PUT': {
			const session = await getSession({ req })
			const category = await getCategory({ categoryId })

			if (
				session.user.id !== category.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			let { category: newCategory } = req.body

			newCategory.slug = slugify(newCategory.name, { lower: true })
			newCategory.id = categoryId

			newCategory = await updateCategory({ category: newCategory })

			res.status(statusCodes.ok).json({ category: newCategory })
			break
		}
		case 'DELETE': {
			const session = await getSession({ req })
			const category = await getCategory({ categoryId })

			if (
				session.user.id !== category.ownerId &&
				session.user.role !== 'admin'
			) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			await deleteCategory({ categoryId })

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		}
		default: {
			res.status(statusCodes.methodNotAllowed).end()
			break
		}
	}
}

export async function getCategory({
	categoryId,
	categorySlug,
	restaurantSlug,
}) {
	if (categoryId) {
		const result = await query(
			`
			SELECT categories.*, categories.restaurant_id AS "restaurantId", restaurants.owner_id AS "ownerId"
			FROM categories 
			JOIN restaurants ON restaurants.id = categories.restaurant_id
			WHERE categories.id = $1
			`,
			[categoryId],
		)
		return result.rows[0]
	}

	if (categorySlug && restaurantSlug) {
		const result = await query(
			`
			SELECT categories.*, categories.restaurant_id AS "restaurantId", restaurants.owner_id AS "ownerId" 
			FROM categories 
			JOIN restaurants ON restaurants.id = categories.restaurant_id
			WHERE categories.slug = $1 AND restaurants.slug = $2
			`,
			[categorySlug, restaurantSlug],
		)
		return result.rows[0]
	}
	return
}

export async function updateCategory({ category }) {
	const { id, slug, name, description } = category
	const result = await query(
		`
		UPDATE categories 
		SET slug = $2, name = $3, description = $4
		WHERE categories.id = $1
		RETURNING *
		`,
		[id, slug, name, description],
	)
	return result.rows[0]
}

export async function deleteCategory({ categoryId }) {
	const result = await query(
		`
		DELETE FROM categories
		WHERE categories.id = $1
		`,
		[categoryId],
	)
	return result.rows[0]
}
