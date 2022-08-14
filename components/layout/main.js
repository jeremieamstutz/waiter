export default function Main({ children, ...props }) {
	return (
		<main
			style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
			{...props}
		>
			{children}
		</main>
	)
}
