import { motion } from 'framer-motion'
import { fadeIn } from 'animations'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useAnimation } from 'contexts/animate'
import useScrollRestoration from 'hooks/useScrollRestauration'

import classes from './container.module.css'

export default function Container({ children, ...props }) {
	const router = useRouter()

	// const [shouldAnimate, setShouldAnimate] = useAnimation()

	const shouldAnimate = false

	// useEffect(() => {
	// 	let popState = false
	// 	router.beforePopState(() => {
	// 		console.log('BEFORE POP')
	// 		popState = true
	// 		setShouldAnimate(false)
	// 		return true
	// 	})

	// 	router.events.on('routeChangeStart', () => {
	// 		console.log(popState)
	// 		if (!popState) {
	// 			// setShouldAnimate(true)
	// 		}
	// 	})
	// }, [])

	// const containerRef = useRef()

	// useScrollRestoration(
	// 	containerRef,
	// 	router.asPath,
	// )

	return (
		<motion.div
			{...props}
			className={`${classes.container} ${props.className}`}
			initial={shouldAnimate ? 'initial' : false}
			animate="animate"
			exit="initial"
			variants={fadeIn}
			// ref={containerRef}
		>
			{children}
		</motion.div>
	)
}
