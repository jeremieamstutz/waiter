export function minutesToTime(min) {
	const hours = Math.floor(min / 60)
		.toString()
		.padStart(2, '0')
	const minutes = (min % 60).toString().padStart(2, '0')
	return `${hours}:${minutes}`
}

export function shiftStartDay(day) {
	return (day + 6) % 7
}

export function getMinutesOfTheDay(date) {
	return date.getHours() * 60 + date.getMinutes()
}

export function isInARange(minutes, ranges) {
	let isInARange = false
	ranges.forEach((range) => {
		if (minutes >= range.start && minutes <= range.end) {
			isInARange = true
		}
	})
	return isInARange
}

export function getWeekdays(locale) {
	const format = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format
	return [...Array(7).keys()].map((day) => {
		const rawString = format(new Date(Date.UTC(2021, 5, day)))
		return rawString.charAt(0).toUpperCase() + rawString.slice(1)
	})
}
