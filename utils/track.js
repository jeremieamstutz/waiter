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

// export default function event(props) {
// 	if (isProduction) window.gtag(props)
// }
// export function pageview({ title, location, pathname, debug }) {
// 	if (isProduction)
// 		window.gtag('event', 'page_view', {
// 			page_title: title,
// 			page_location: location,
// 			page_path: pathname,
// 			debug_mode: debug,
// 		})
// }

// export function event({ category, action, label, value, debug }) {
// 	if (isProduction)
// 		window.gtag('event', action, {
// 			event_category: category,
// 			event_label: label,
// 			value: value,
// 			debug_mode: debug,
// 		})
// }
