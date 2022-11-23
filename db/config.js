require('dotenv').config()

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
	},
	// production: {
	// 	username: process.env.DB_USER,
	// 	password: process.env.DB_PASS,
	// 	database: process.env.DB_NAME,
	// 	host: process.env.DB_HOST,
	// 	pool: {
	// 		max: 3,
	// 		min: 0,
	// 		idle: 0,
	// 		acquire: 3000,
	// 	},
	// 	logging: false,
	// 	dialect: 'postgres',
	// 	dialectOptions: {
	// 		ssl: {
	// 			require: true,
	// 			rejectUnauthorized: false,
	// 		},
	// 	},
	// },
}
