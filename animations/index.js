export const stagger = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

export const fadeIn = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.1,
			ease: 'easeInOut'
		},
	},
}

export const fadeInUp = {
	initial: {
		opacity: 0,
		y: 20,
		transition: {
			duration: 0.1,
			ease: 'easeInOut'
		},
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.1,
		},
	},
}

export const fadeInAndLeft = {
	initial: {
		opacity: 0,
		x: 40,
		transition: {
			duration: 0.1,
		},
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.1,
		},
	},
}

export const bounce = {}

export const shake = {}

export const wobble = {}

export const rotateIn = {}

export const zoomIn = {}

export const pulse = {}

export const flash = {}

export const slideIn = {}