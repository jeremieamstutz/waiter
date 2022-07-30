export default function Logo() {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '0.5rem',
			}}
		>
			<div
				style={{
					border: '3px solid var(--color-ui-primary)',
					width: '1.25rem',
					height: '1.25rem',
					borderRadius: '50%',
				}}
			/>
			<div style={{ fontSize: '1.5rem' }}>waiter</div>
		</div>
	)
}
