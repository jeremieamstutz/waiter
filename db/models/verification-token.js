import { DataTypes } from 'sequelize'
import sequelize from 'db'

const VerificationToken = sequelize.define('verificationToken', {
	identifier: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	token: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	expires: {
		field: 'expires_at',
		type: DataTypes.DATE,
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

export default VerificationToken
