import statusCodes from 'utils/statusCodes'
import { query, sql } from 'utils/db'
import slugify from 'slugify'
import { User } from 'db/models'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
	const {
		query: { userId },
		method,
	} = req

	switch (method) {
		case 'GET': {
			const user = await getUser(userId)

			res.status(statusCodes.ok).json(user)
			break
		}
		case 'PUT': {
			const session = await getServerSession(req, res, authOptions)

			if (session.user.id !== userId && session.user.role !== 'admin') {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			const user = req.body
			user.id = userId

			Object.keys(user).forEach(
				(k) => (user[k] = user[k] === '' ? null : user[k]),
			)

			user.slug = slugify(`${user.firstName}.${user.lastName}`, {
				lower: true,
			})

			const newUser = await updateUser(user)

			res.status(statusCodes.ok).json(newUser)
			break
		}
		case 'DELETE': {
			const session = await getServerSession(req, res, authOptions)

			if (session.user.id !== userId && session.user.role !== 'admin') {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'Not the right owner' })
			}

			await deleteUser(userId)

			res.status(statusCodes.ok).json({ status: 'success' })
			break
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function getUser(userId) {
	const result = await query(
		sql`SELECT 
				"id",
				"slug",
				"first_name" AS "firstName",
				"last_name" AS "lastName",
				"email",
				"phone",
				"role",
				"image",
				"gender",
				"birthdate",
				"created_at" AS "createdAt",
				"updated_at" AS "updatedAt"
        	FROM 
				"users"
        	WHERE 
				"id" = ${userId}`,
	)
	let user = result.rows[0]
	return user
}

export async function updateUser(user) {
	const {
		id,
		slug,
		image,
		firstName,
		lastName,
		phone,
		birthdate,
		bio,
		language,
		country,
		gender,
	} = user

	const results = await User.update(
		{
			slug,
			image,
			firstName,
			lastName,
			phone,
			birthdate,
			bio,
			language,
			country,
			gender,
			image,
		},
		{
			where: { id },
			returning: true,
		},
	)

	console.log(results[1][0].bio)
	return
}

export async function deleteUser(userId) {
	await query(
		sql`DELETE FROM 
				"users" 
			WHERE 
				"id" = ${userId}`,
	)
}
