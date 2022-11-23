import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Item = sequelize.define('item', {
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
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL(6, 2),
		allowNull: false,
	},
	currency: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	available: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
	allergies: {
		type: DataTypes.ARRAY(DataTypes.STRING),
	},
	tags: {
		type: DataTypes.ARRAY(DataTypes.STRING),
	},
	image: {
		type: DataTypes.STRING,
	},
	sequenceNumber: {
		type: DataTypes.INTEGER,
	},
	allowNote: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
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

export default Item
