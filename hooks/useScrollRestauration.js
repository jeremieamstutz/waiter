import { useRouter } from 'next/router'
import { useEffect } from 'react'

function saveScrollPos(id, list) {
	const newScrollPosition = {
		x: list.scrollLeft,
		y: list.scrollTop,
	}

	const scrollPositions =
		JSON.parse(sessionStorage.getItem('scrollPositions')) || {}

	scrollPositions[id] = newScrollPosition
	sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions))
}

function restoreScrollPos(id, list) {
	const scrollPositions =
		JSON.parse(sessionStorage.getItem('scrollPositions')) || {}

	if (scrollPositions[id]) {
		list.scrollLeft = scrollPositions[id].x
		list.scrollTop = scrollPositions[id].y
	}
}

export default function useScrollRestoration(element, id) {
	const router = useRouter()

	useEffect(() => {
		if (element.current) {
			restoreScrollPos(id, element.current)

			const onBeforeUnload = () => {
				saveScrollPos(id, element.current)
			}

			const onRouteChangeStart = () => {
				saveScrollPos(id, element.current)
			}

			window.addEventListener('beforeunload', onBeforeUnload)
			router.events.on('routeChangeStart', onRouteChangeStart)

			return () => {
				window.removeEventListener('beforeunload', onBeforeUnload)
				router.events.off('routeChangeStart', onRouteChangeStart)
			}
		}
	}, [router])
}
