import { Sequelize } from 'sequelize'
import configs from 'db/config'

let sequelize

if (!sequelize) {
	sequelize = new Sequelize(configs[process.env.NODE_ENV])
	// sequelize.sync()
} else {
	sequelize.connectionManager.initPools()

	if (sequelize.connectionManager.hasOwnProperty('getConnection')) {
		delete sequelize.connectionManager.getConnection
	}
}

export default sequelize
