import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Flag = sequelize.define('flag', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	key: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	enabled: {
		type: DataTypes.BOOLEAN,
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

export default Flag
