import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Order = sequelize.define('order', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	status: {
		type: DataTypes.ENUM,
		values: [
			'pending',
			'declined',
			'started',
			'completed',
			'delivered',
			'cancelled',
			'refunded',
			'disputed',
		],
		defaultValue: 'pending',
		allowNull: false,
	},
	total: {
		type: DataTypes.DECIMAL(5, 2),
		allowNull: false,
		validate: {
			min: 0,
		},
	},
	currency: {
		type: DataTypes.STRING,
	},
	note: {
		type: DataTypes.TEXT,
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
