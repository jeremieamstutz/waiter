import { useEffect } from 'react'

export default function useLockBodyScroll(shouldLock = true) {
	useEffect(() => {
		if (shouldLock) {
			const originalStyle = window.getComputedStyle(document.body).overflow
	
			document.body.style.overflow = 'hidden'
	
			return () => {
				document.body.style.overflow = originalStyle
			}
		}
	}, [shouldLock])
}
