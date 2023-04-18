require('dotenv').config()

const pg = require('pg')

module.exports = {
	development: {
		dialect: 'postgres',
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		logging: false,
		define: {
			underscored: true,
			paranoid: true,
		},
		dialectModule: pg,
	},
	production: {
		dialect: 'postgres',
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		logging: false,
		define: {
			underscored: true,
			paranoid: true,
		},
		dialectModule: pg,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
}
