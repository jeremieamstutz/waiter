import useEffectOnce from './useEffectOnce'
import useUpdateEffect from './useUpdateEffect'

export default function useLogger(componentName, ...rest) {
	useEffectOnce(() => {
		console.log(`${componentName} mounted`, ...rest)
		return () => console.log(`${componentName} unmounted`, ...rest)
	})

	useUpdateEffect(() => {
		console.log(`${componentName} updated`, ...rest)
	})
}
