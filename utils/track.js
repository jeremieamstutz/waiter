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
}