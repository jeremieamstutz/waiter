import { useEffect, useRef } from 'react'

import Menu from './menu'
import AddToHomeScreen from 'components/cta/add-to-home-screen'

import classes from './header.module.css'

export default function Header({ children }) {
	const spacerRef = useRef()
	const headerRef = useRef()

	useEffect(() => {
		if (headerRef.current) {
			const rect = headerRef.current.getBoundingClientRect()
			spacerRef.current.style.height = rect.height + 'px'
		}
	})

	return (
		<>
			<div className={classes.header} ref={headerRef}>
				{children}
				{/* <AddToHomeScreen /> */}
				<Menu />
			</div>

			<div ref={spacerRef} className={classes.spacer} />
		</>
	)
}
