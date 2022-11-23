import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Category = sequelize.define('category', {
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

export default Category
