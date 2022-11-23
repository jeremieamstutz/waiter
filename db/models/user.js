import { DataTypes } from 'sequelize'
import sequelize from 'db'

const User = sequelize.define('user', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	stripeCustomerId: {
		type: DataTypes.STRING,
	},
	slug: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	fullName: {
		type: DataTypes.VIRTUAL,
		get() {
			return `${this.firstName} ${this.lastName}`
		},
	},
	phone: {
		type: DataTypes.STRING,
	},
	birthdate: {
		type: DataTypes.DATE,
	},
	bio: {
		type: DataTypes.TEXT,
	},
	language: {
		type: DataTypes.STRING,
	},
	country: {
		type: DataTypes.STRING,
	},
	gender: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	emailVerified: {
		type: DataTypes.DATE,
	},
	role: {
		type: DataTypes.ENUM,
		values: ['user', 'modo', 'admin'],
		allowNull: false,
		defaultValue: 'user',
	},
	image: {
		type: DataTypes.STRING(1024),
		validate: { isUrl: true },
	},
	credits: {
		type: DataTypes.REAL,
		defaultValue: 0,
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

export default User
