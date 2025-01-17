import { useEffect, useRef } from 'react'

export default function useEventListener(eventName, handler, element = window) {
	const savedHandler = useRef()

	useEffect(() => {
		savedHandler.current = handler
	}, [handler])

	useEffect(() => {
		const isSupported = element && element.addEventListener
		if (!isSupported) return

		function eventListener(event) {
			savedHandler.current(event)
		}
		element.addEventListener(eventName, eventListener)

		return () => {
			element.removeEventListener(eventName, eventListener)
		}
	}, [eventName, element])
}
