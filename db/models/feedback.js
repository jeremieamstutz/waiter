import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Feedback = sequelize.define('feedback', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	emotion: {
		type: DataTypes.STRING,
	},
	message: {
		type: DataTypes.TEXT,
	},
	url: {
		type: DataTypes.STRING,
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

export default Feedback
