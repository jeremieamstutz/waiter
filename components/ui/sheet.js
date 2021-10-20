import { useEffect, useCallback } from 'react'
import Portal from 'components/misc/portal'

import useLockBodyScroll from 'hooks/useLockBodyScroll'

import classes from './sheet.module.css'

const Backdrop = ({ onClick }) => (
	<div className={classes.backdrop} onClick={onClick} />
)

const Overlay = ({ children, onClose }) => {
	return (
		<div className={classes.container}>
			<div className={classes.sheet}>{children}</div>
		</div>
	)
}

export default function Sheet({ children, onClose }) {
	useLockBodyScroll()

	const escape = useCallback(
		(event) => {
			if (event.keyCode === 27) {
				onClose()
			}
		},
		[onClose],
	)
	useEffect(() => {
		document.addEventListener('keydown', escape)
		return () => {
			document.removeEventListener('keydown', escape)
		}
	}, [escape])

	return (
		<Portal selector="#sheets">
			<Backdrop onClick={onClose} />
			<Overlay onClose={onClose}>{children}</Overlay>
		</Portal>
	)
}
