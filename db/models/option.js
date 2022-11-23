import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Option = sequelize.define('option', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.DECIMAL(6, 2),
		allowNull: false,
	},
	minQuantity: {
		type: DataTypes.INTEGER,
	},
	maxQuantity: {
		type: DataTypes.INTEGER,
	},
	defaultQuantity: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	sequenceNumber: {
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

export default Option
