import { useEffect, useState } from 'react'

export default function useDebounce(value, delay, params) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		if (!params.debounce) {
			return setDebouncedValue(value)
		}
		
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value])

    return debouncedValue
}
