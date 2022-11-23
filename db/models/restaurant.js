import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Restaurant = sequelize.define('restaurant', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	accountId: {
		type: DataTypes.STRING,
	},
	slug: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	status: {
		type: DataTypes.ENUM,
		values: ['visible', 'hidden', 'reported'],
		defaultValue: 'hidden',
		allowNull: false,
	},
	logo: {
		type: DataTypes.STRING,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	slogan: {
		type: DataTypes.STRING,
	},
	description: {
		type: DataTypes.TEXT,
	},
	phone: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
	},
	website: {
		type: DataTypes.STRING,
	},
	currency: {
		type: DataTypes.STRING,
	},
	allowBooking: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	ratingValue: {
		type: DataTypes.REAL,
	},
	reviewCount: {
		type: DataTypes.INTEGER,
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: sequelize.fn('NOW'),
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: sequelize.fn('NOW'),
	},
})

export default Restaurant
