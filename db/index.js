import { Sequelize } from 'sequelize'
import configs from 'db/config'

let sequelize

if (!sequelize) {
	console.log('New sequelize instance')
	sequelize = new Sequelize(configs[process.env.NODE_ENV])
	sequelize.sync()
}

export default sequelize
