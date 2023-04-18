import { useEffect } from 'react'

export default function useEffectOnce(effect) {
	useEffect(effect, [])
}
