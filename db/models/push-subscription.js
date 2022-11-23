import { DataTypes } from 'sequelize'
import sequelize from 'db'

const PushSubscription = sequelize.define('pushSubscription', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	endpoint: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	clientPublicKey: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	clientPrivateKey: {
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

export default PushSubscription
