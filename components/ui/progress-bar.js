export default function CircularProgressBar({ progress }) {
	return (
		<div
			style={{
				width: '8rem',
				height: '8em',
				borderRadius: '50%',
				mask: 'radial-gradient(circle, rgba(0, 0, 0, 0) 3.25rem, rgba(0, 0, 0, 1) 3.25rem)',
				WebkitMask:
					'radial-gradient(circle, rgba(0, 0, 0, 0) 3.25rem, rgba(0, 0, 0, 1) 3.25rem)',
				background: `conic-gradient(#a00 ${
					progress * 3.6
				}deg, #ddd 0deg)`,
				transition: 'all 150ms',
			}}
		/>
	)
}
