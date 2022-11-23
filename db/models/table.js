import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Table = sequelize.define('table', {
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
	seats: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	location: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.ENUM,
		values: ['available', 'in_use'],
		defaultValue: 'available',
		allowNull: false,
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

export default Table
