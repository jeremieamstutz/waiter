import { useEffect, useCallback } from 'react'

import Portal from 'components/misc/portal'
import CloseButton from 'components/buttons/close'
import useLockBodyScroll from 'hooks/useLockBodyScroll'

import classes from './modal.module.css'

const Backdrop = ({ onClick }) => (
	<div className={classes.backdrop} onClick={onClick} />
)

const Overlay = ({ onClose, children, size }) => {
	return (
		<div
			className={classes.container}
			role="dialog"
			aria-modal="true"
			aria-labelledby="title"
		>
			<div className={`${classes.modal} ${classes[size]}`}>
				<CloseButton
					onClick={onClose}
					className={`${classes.close} secondary`}
				/>
				<div className={classes.body}>{children}</div>
			</div>
		</div>
	)
}

export default function Modal({ onClose, children, size }) {
	useLockBodyScroll(true)

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
		<Portal selector="#modals">
			<Backdrop onClick={onClose} />
			<Overlay onClose={onClose} size={size}>
				{children}
			</Overlay>
		</Portal>
	)
}
