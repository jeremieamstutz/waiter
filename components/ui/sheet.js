import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Portal from 'components/misc/portal'
import useLockBodyScroll from 'hooks/useLockBodyScroll'

import classes from './sheet.module.css'
import { fadeIn, fadeInUp } from 'animations'

const Backdrop = ({ onClick }) => (
	<motion.div
		className={classes.backdrop}
		onClick={onClick}
		initial="initial"
		animate="animate"
		exit="initial"
		variants={fadeIn}
	/>
)

const Overlay = ({ children, onClose }) => {
	return (
		<motion.div
			className={classes.container}
			initial="initial"
			animate="animate"
			exit="initial"
			variants={fadeInUp}
		>
			<div className={classes.sheet}>{children}</div>
		</motion.div>
	)
}

export default function Sheet({ children, show, onClose }) {
	useLockBodyScroll(show)

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
			<AnimatePresence>
				{show && (
					<>
						<Backdrop onClick={onClose} />
						<Overlay onClose={onClose}>{children}</Overlay>
					</>
				)}
			</AnimatePresence>
		</Portal>
	)
}
