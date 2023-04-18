import { useEffect, useRef } from 'react'

export default function useUpdateEffect(effect, deps) {
	const isReady = useRef(false)

	if (!isReady.current) {
		isReady.current = true
	}

	useEffect(() => {
		if (isReady.current) {
			return effect()
		}
	}, deps)
}
