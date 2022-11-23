import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Schedule = sequelize.define('schedule', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	type: {
		type: DataTypes.ENUM,
		values: ['restaurant', 'cuisine'],
		defaultValue: 'restaurant',
		allowNull: false,
	},
	day: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	open: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	close: {
		type: DataTypes.STRING,
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

export default Schedule
