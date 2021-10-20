import { useEffect, useState } from 'react'

export default function useStandalone() {
	const [standalone, setStandalone] = useState(false)

	useEffect(() => {
		if (
			window.navigator.standalone === true ||
			window.matchMedia('(display-mode: standalone)').matches
		)
			setStandalone(true)
	}, [])

	return standalone
}
