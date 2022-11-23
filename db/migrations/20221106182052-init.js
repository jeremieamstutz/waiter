module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction()
		try {
			const { DataTypes } = Sequelize

			await queryInterface.createTable('user', {})

			await queryInterface.createTable(
				'account',
				{
					id: {
						primaryKey: true,
						type: DataTypes.UUID,
						allowNull: false,
						defaultValue:
							queryInterface.sequelize.fn('gen_random_uuid'),
					},
					type: {
						type: DataTypes.STRING,
					},
					provider: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					providerAccountId: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					refreshToken: {
						type: DataTypes.STRING,
					},
					accessToken: {
						type: DataTypes.STRING,
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
						type: DataTypes.STRING,
					},
					sessionState: {
						type: DataTypes.STRING,
					},
					oauthTokenSecret: {
						type: DataTypes.STRING,
					},
					oauthToken: {
						type: DataTypes.STRING,
					},
				},
				{
					underscored: true,
					transaction,
				},
			)

			// await queryInterface.createTable('session', {})

			// await queryInterface.createTable('paymentMethod', {})

			// await queryInterface.createTable('verificationToken', {})

			// await queryInterface.createTable('restaurant', {})

			// await queryInterface.createTable('address', {})

			// await queryInterface.createTable('cuisine', {})

			// await queryInterface.createTable('restaurantCuisine', {})

			// await queryInterface.createTable('restaurantImage', {})

			// await queryInterface.createTable('schedule', {})

			// await queryInterface.createTable('menu', {})

			// await queryInterface.createTable('category', {})

			// await queryInterface.createTable('item', {})

			// await queryInterface.createTable('modifier', {})

			// await queryInterface.createTable('itemModifier', {})

			// await queryInterface.createTable('option', {})

			// await queryInterface.createTable('cart', {})

			// await queryInterface.createTable('cartItem', {})

			// await queryInterface.createTable('order', {})

			// await queryInterface.createTable('orderItem', {})

			// await queryInterface.createTable('review', {})

			// await queryInterface.createTable('notification', {})

			// await queryInterface.createTable('flag', {})

			// await queryInterface.createTable('feedback', {})

			await transaction.commit()
		} catch (error) {
			await transaction.rollback()
			throw error
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('')
	},
}
