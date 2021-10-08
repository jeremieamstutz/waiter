import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Portal({ selector, children }) {
	const portalRef = useRef()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		portalRef.current = document.querySelector(selector)
		setMounted(true)
	}, [selector])

	return mounted ? createPortal(children, portalRef.current) : null
}
