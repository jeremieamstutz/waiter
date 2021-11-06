import { motion } from 'framer-motion'
import { fadeIn } from 'animations'

export default function Container({ children }) {
	return (
		<motion.div
			className="container"
			initial="initial"
			animate="animate"
			exit="initial"
			variants={fadeIn}
		>
			{children}
		</motion.div>
	)
}
