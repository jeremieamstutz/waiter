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
		pool: {
			max: 3,
			min: 0,
			idle: 0,
			acquire: 3000,
		},
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
		pool: {
			max: 3,
			min: 0,
			idle: 0,
			acquire: 3000,
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
