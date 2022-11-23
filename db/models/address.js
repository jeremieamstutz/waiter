import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Address = sequelize.define('address', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	full: {
		type: DataTypes.VIRTUAL,
		get() {
			return `${this.street} ${this.streetNumber}, ${this.postalCode} ${this.city}`
		},
	},
	street: {
		type: DataTypes.STRING,
	},
	streetNumber: {
		type: DataTypes.STRING,
	},
	postalCode: {
		type: DataTypes.STRING,
	},
	city: {
		type: DataTypes.STRING,
	},
	region: {
		type: DataTypes.STRING,
	},
	country: {
		type: DataTypes.STRING,
	},
	latitude: {
		type: DataTypes.REAL,
	},
	longitude: {
		type: DataTypes.REAL,
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

export default Address
