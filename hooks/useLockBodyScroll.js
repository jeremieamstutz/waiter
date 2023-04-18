import { useEffect } from 'react'

let locked = false

export default function useLockBodyScroll() {
	useEffect(() => {
		if (!locked) {
			const scrollPosition = window.scrollY

			document.body.style.overflow = 'hidden'
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollPosition}px`
			document.body.style.width = '100%'

			locked = true

			return () => {
				document.body.style.removeProperty('overflow')
				document.body.style.removeProperty('position')
				document.body.style.removeProperty('top')
				document.body.style.removeProperty('width')
				window.scroll(0, scrollPosition)

				locked = false
			}
		}
	}, [])
}
