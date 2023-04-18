import { Sequelize } from 'sequelize'
import configs from 'db/config'

let sequelize = global.sequelize

if (!sequelize) {
	sequelize = global.sequelize = new Sequelize(configs[process.env.NODE_ENV])
	// sequelize.sync()
}

export default sequelize
