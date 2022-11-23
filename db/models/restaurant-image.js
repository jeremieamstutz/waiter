import { DataTypes } from 'sequelize'
import sequelize from 'db'

const RestaurantImage = sequelize.define('restaurantImage', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	url: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	legend: {
		type: DataTypes.STRING,
	},
	status: {
		type: DataTypes.ENUM,
		values: ['visible', 'hidden', 'reported'],
		defaultValue: 'visible',
		allowNull: false,
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

export default RestaurantImage
