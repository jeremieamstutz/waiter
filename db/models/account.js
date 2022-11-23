import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Account = sequelize.define('account', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	type: {
		type: DataTypes.STRING,
	},
	provider: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	providerAccountId: {
		type: DataTypes.STRING(4096),
		allowNull: false,
	},
	refreshToken: {
		type: DataTypes.STRING(4096),
	},
	accessToken: {
		type: DataTypes.STRING(4096),
	},
	expiresAt: {
		type: DataTypes.INTEGER,
	},
	tokenType: {
		type: DataTypes.STRING,
	},
	scope: {
		type: DataTypes.STRING,
	},
	idToken: {
		type: DataTypes.STRING(4096),
	},
	sessionState: {
		type: DataTypes.STRING,
	},
	oauthTokenSecret: {
		type: DataTypes.STRING(4096),
	},
	oauthToken: {
		type: DataTypes.STRING(4096),
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

export default Account
