import { DataTypes } from 'sequelize'
import sequelize from 'db'

const PaymentMethod = sequelize.define('paymentMethod', {
	id: {
		primaryKey: true,
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
	},
	sequence_number: {
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

export default PaymentMethod
