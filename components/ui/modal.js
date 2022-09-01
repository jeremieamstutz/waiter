import { useEffect, useCallback, useRef } from 'react'

import Portal from 'components/misc/portal'
import useLockBodyScroll from 'hooks/useLockBodyScroll'

import classes from './modal.module.css'

const Backdrop = ({ onClick }) => {
	return <div className={classes.backdrop} onClick={onClick} />
}

export default function Modal({
	onClose,
	title,
	children,
	header,
	footer,
	...props
}) {
	useLockBodyScroll()

	const modalRef = useRef()

	const listeners = useCallback(
		(event) => {
			switch (event.keyCode) {
				// Escape
				case 27:
					onClose()
					break

				// Trap focus
				case 9:
					const focusableModalElements =
						modalRef.current.querySelectorAll(
							'a, button, textarea, input, select',
						)

					const firstElement = focusableModalElements[0]
					const lastElement =
						focusableModalElements[
							focusableModalElements.length - 1
						]

					// Start in the modal
					if (
						!Array.from(focusableModalElements).find(
							(node) => node === document.activeElement,
						)
					) {
						firstElement.focus()
						return event.preventDefault()
					}

					// Loop through the elements
					if (
						!event.shiftKey &&
						document.activeElement === lastElement
					) {
						firstElement.focus()
						return event.preventDefault()
					}

					if (
						event.shiftKey &&
						document.activeElement === firstElement
					) {
						lastElement.focus()
						return event.preventDefault()
					}
			}
		},
		[onClose],
	)

	useEffect(() => {
		document.addEventListener('keydown', listeners)
		return () => {
			document.removeEventListener('keydown', listeners)
		}
	}, [listeners])

	return (
		<Portal selector="#modals">
			<Backdrop onClick={onClose} />
			<div className={classes.container}>
				<div
					className={classes.modal}
					role="dialog"
					aria-modal="true"
					ref={modalRef}
					{...props}
				>
					{header === false ? undefined : (
						<header className={classes.title}>
							{header ? (
								header
							) : (
								<>
									<div
										style={{
											minWidth: '2.5rem',
											minHeight: '2.5rem',
											display: 'flex',
											gap: '0.5rem',
											flexShrink: 1,
										}}
									></div>
									<h1>{title}</h1>
									<button
										onClick={onClose}
										className={classes.close}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</>
							)}
						</header>
					)}
					<main className={classes.body}>{children}</main>
					{footer && (
						<footer className={classes.actions}>{footer}</footer>
					)}
				</div>
			</div>
		</Portal>
	)
}
