import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Session = sequelize.define('session', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	expires: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	sessionToken: {
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

export default Session
