module.exports = {
	i18n: {
		locales: ['default', 'en', 'fr', 'de'],
		defaultLocale: 'default',
		localeDetection: false,
	},
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
			'source.unsplash.com',
			'images.unsplash.com',
		],
		minimumCacheTTL: 3600,
		deviceSizes: [240, 320, 480, 640, 960, 1080, 1240, 1400],
	},
	optimizeFonts: false,
}
