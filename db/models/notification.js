import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Notification = sequelize.define('notification', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	read: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	interacted: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	type: {
		type: DataTypes.ENUM,
		values: ['new_order', 'new_message'],
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

export default Order
