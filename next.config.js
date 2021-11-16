const { withSuperjson } = require('next-superjson')

module.exports = withSuperjson()({
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		domains: [
			'localhost',
			'www.waiter.so',
			'waiter.fra1.digitaloceanspaces.com',
			'www.flughafen-zuerich.ch',
			'www.holycow.ch',
			'lh3.googleusercontent.com',
			'platform-lookaside.fbsbx.com',
		],
		minimumCacheTTL: 60*60*24*30,
	},
	optimizeFonts: false
})
