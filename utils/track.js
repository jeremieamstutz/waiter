const isProduction = process.env.NODE_ENV === 'production'

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export default {
	event: function (props) {
		const { event_name, ...rest } = props
		if (isProduction) {
			window.gtag('event', event_name, rest)
		} else {
			window.gtag('event', event_name, { ...rest, debug_mode: true })
		}
	},
	config: function (props) {
		if (isProduction) {
			window.gtag('config', GA_TRACKING_ID, props)
		} else {
			window.gtag('config', GA_TRACKING_ID, {
				...props,
				debug_mode: true,
			})
		}
	},
}
