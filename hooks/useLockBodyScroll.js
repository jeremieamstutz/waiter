import { useEffect } from 'react'

export default function useLockBodyScroll() {
	useEffect(() => {
		const { overflow, paddingRight } = window.getComputedStyle(
			document.body,
		)

		document.body.style.overflow = 'hidden'
		// document.body.style.paddingRight = '15px'

		return () => {
			document.body.style.overflow = overflow
			// document.body.style.paddingRight = paddingRight
		}
	}, [])
}
