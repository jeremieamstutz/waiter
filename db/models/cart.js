import { DataTypes } from 'sequelize'
import sequelize from 'db'

const Cart = sequelize.define('cart', {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: sequelize.fn('gen_random_uuid'),
	},
	total: {
		type: DataTypes.DECIMAL(5, 2),
		allowNull: false,
		validate: {
			min: 0,
		},
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

export default Cart
