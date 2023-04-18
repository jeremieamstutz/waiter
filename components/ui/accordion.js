import { useEffect, useRef, useState } from 'react'
import PlusIcon from 'components/icons/plus'
import ChevronIcon from 'components/icons/chevron'

export default function Accordion({ header, content, initial = false }) {
	const [open, setOpen] = useState(initial)

	const contentRef = useRef()

	useEffect(() => {
		contentRef.current.style.maxHeight = open
			? `${contentRef.current.scrollHeight}px`
			: '0px'
	}, [contentRef, open])

	return (
		<div
			style={{
				borderBottom: '1px solid #eee',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '2rem',
					userSelect: 'none',
					cursor: 'pointer',
					padding: '1rem 0',
				}}
				onClick={() => setOpen((prev) => !prev)}
			>
				<h2
					style={{
						flex: 1,
						margin: 0,
						lineHeight: '150%',
					}}
				>
					{header}
				</h2>
				<div
					style={{
						// background: '#eee',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '2.5rem',
						height: '2.5rem',
						borderRadius: '50%',
					}}
				>
					<ChevronIcon direction={open ? 'up' : 'down'} />
				</div>
			</div>
			<div
				ref={contentRef}
				style={{ overflow: 'hidden', transition: 'all 150ms' }}
			>
				{content}
			</div>
		</div>
	)
}
