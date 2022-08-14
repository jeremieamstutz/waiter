const path = require('path')

module.exports = {
	i18n: {
		locales: ['default', 'en', 'fr', 'de'],
		defaultLocale: 'default',
		localeDetection: false,
		localePath: path.resolve('./locales'),
		fallbackLng: 'en',
		reloadOnPrerender: true,
	},
}
