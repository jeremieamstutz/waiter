import { useRef } from 'react'

import Menu from './menu'

import classes from './header.module.css'

export default function Header({ children }) {
	const headerRef = useRef()

	return (
		<>
			<div className={classes.header} ref={headerRef}>
				{children}
				<Menu />
			</div>
		</>
	)
}
