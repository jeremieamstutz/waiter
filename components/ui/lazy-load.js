export default function LazyLoad(props) {
	const { tag = 'div', children, style, className } = props
	const Tag = tag
	const ref = useRefnull
	const isIntersecting = useIntersectionObserver(
		ref,
		{
			root: props.root ?? null,
			threshold: props.threshold ?? 0,
			rootMargin: props.rootMargin,
		},
		props.forward,
	)

	return (
		<Tag
			ref={ref}
			style={style}
			className={className}
			children={isIntersecting ? children : null}
		/>
	)
}
