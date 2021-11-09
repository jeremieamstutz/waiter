import { createContext, useContext, useState } from 'react'

export const AnimationContext = createContext([])

export function AnimationProvider({ children }) {
	const [shouldAnimate, setShouldAnimate] = useState(true)

	const animationContext = [shouldAnimate, setShouldAnimate]

	return (
		<AnimationContext.Provider value={animationContext}>
			{children}
		</AnimationContext.Provider>
	)
}

export function useAnimation() {
	return useContext(AnimationContext)
}