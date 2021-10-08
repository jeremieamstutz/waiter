const isProduction = process.env.NODE_ENV === 'production'

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

export const pageview = (title, location, pathname) => {
	if (isProduction)
		window.gtag('event', 'page_view', {
			page_title: title,
			page_location: location,
			page_path: pathname,
		})
}

export const event = ({ action, category, label, value }) => {
	if (isProduction)
		window.gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		})
}
