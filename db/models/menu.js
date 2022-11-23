import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Menu = sequelize.define('menu', {
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
	startTime: {
		type: DataTypes.DATE,
	},
	endTime: {
		type: DataTypes.DATE,
	},
	visible: {
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

export default Menu
