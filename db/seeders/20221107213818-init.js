const users = require('../data/users.json')
const accounts = require('../data/accounts.json')

const restaurants = require('../data/restaurants.json')
const addresses = require('../data/addresses.json')
const restaurantImages = require('../data/restaurant_images.json')
const categories = require('../data/categories.json')
const items = require('../data/items.json')

const flags = require('../data/flags.json')

module.exports = {
	async up(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction()
		try {
			await queryInterface.bulkInsert('users', users, { transaction })
			await queryInterface.bulkInsert('accounts', accounts, {
				transaction,
			})

			await queryInterface.bulkInsert('restaurants', restaurants, {
				transaction,
			})

			await queryInterface.bulkInsert('addresses', addresses, {
				transaction,
			})

			await queryInterface.bulkInsert(
				'restaurant_images',
				restaurantImages,
				{ transaction },
			)

			await queryInterface.bulkInsert('categories', categories, {
				transaction,
			})
			await queryInterface.bulkInsert('items', items, { transaction })

			await queryInterface.bulkInsert('flags', flags, { transaction })

			console.log('Commit')
			await transaction.commit()
		} catch (error) {
			console.log('Rollback')
			await transaction.rollback()
			throw error
		}
	},

	async down(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction()
		try {
			await queryInterface.bulkDelete('users', null, { transaction })
			await queryInterface.bulkDelete('accounts', null, { transaction })

			await queryInterface.bulkDelete('restaurants', null, {
				transaction,
			})
			await queryInterface.bulkDelete('addresses', null, {
				transaction,
			})
			await queryInterface.bulkDelete('restaurant_images', null, {
				transaction,
			})

			await queryInterface.bulkDelete('categories', null, { transaction })
			await queryInterface.bulkDelete('items', null, { transaction })

			await queryInterface.bulkDelete('flags', null, { transaction })

			console.log('Commit')
			await transaction.commit()
		} catch (error) {
			console.log('Rollback')
			await transaction.rollback()
			throw error
		}
	},
}
