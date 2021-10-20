import { useCallback, useMemo, useRef } from 'react'

// const longPressProps = useLongPress({
//     onClick: event => console.log(event),
//     onLongPress: event => console.log(event),
//     delay: 200
// })

// <button {...longPressProps}>Click here</button>

export default function useLongPress({
	onClick = () => {},
	onLongPress = () => {},
	delay = 300,
}) {
	const timerRef = useRef(false)
	const eventRef = useRef({})

	const callback = useCallback(() => {
		onLongPress(eventRef.current)
		eventRef.current = {}
		timerRef.current = false
	}, [onLongPress])

	const start = useCallback(
		(event) => {
			eventRef.current = event
			timerRef.current = setTimeout(callback, delay)
		},
		[callback, delay],
	)

	const stop = useCallback(
		(event) => {
			eventRef.current = event
			if (timerRef.current) {
				clearTimeout(timerRef.current)
				onClick(eventRef.current)
				eventRef.current = {}
				timerRef.current = false
				timerRef.current = false
			}
		},
		[onClick],
	)

	return useMemo(
		() => ({
			onMouseDown: start,
			onMouseUp: stop,
			onMouseLeave: stop,
			onTouchStart: start,
			onTouchEnd: stop,
		}),
		[start, stop],
	)
}
