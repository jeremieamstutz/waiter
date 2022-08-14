import { getSession } from 'next-auth/react'
import statusCodes from 'utils/statusCodes'
import { Sequelize, DataType } from 'sequelize'

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'postgres',
})

const User = sequelize.define('User', {
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
	},
})

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			// const restaurants = await getAllRestaurants()
			// res.status(statusCodes.ok).json({ restaurants })
			break
		case 'POST':
			const { booking } = req.body

			const session = await getSession({ req })

			res.status(statusCodes.ok).json({})
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

export async function createBooking() {
	return
}
