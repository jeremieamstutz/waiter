import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Booking = sequelize.define('booking', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	startTime: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	endTime: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	seats: {
		type: DataTypes.INTEGER,
		allowNull: false,
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

export default Booking
