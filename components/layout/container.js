import { motion } from 'framer-motion'
import { fadeIn } from 'animations'

import classes from './container.module.css'

export default function Container({ children, ...props }) {
	return (
		<motion.div
			className={classes.container}
			initial="initial"
			animate="animate"
			exit="initial"
			variants={fadeIn}
			{...props}
		>
			{children}
		</motion.div>
	)
}
