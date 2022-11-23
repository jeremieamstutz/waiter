import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Modifier = sequelize.define('modifier', {
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
	minSelection: {
		type: DataTypes.INTEGER,
	},
	maxSelection: {
		type: DataTypes.INTEGER,
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

export default Modifier
