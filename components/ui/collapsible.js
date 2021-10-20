import { useState, useRef } from 'react'

import Backdrop from './backdrop'

import useOnClickOutside from 'hooks/useOnClickOutside'
import useLockBodyScroll from 'hooks/useLockBodyScroll'

import classes from './collapsible.module.css'

export default function Collapsible({ children, trigger, ...props }) {
	const [open, setOpen] = useState(false)

	const collapsibleRef = useRef()

	useOnClickOutside(collapsibleRef, (event) => {
		if (open) setOpen(false)
	})

	useLockBodyScroll(open)

	return (
		<>
		
		{open ? <Backdrop /> : null}
		<div ref={collapsibleRef}>
			<div
				className={classes.trigger}
				onClick={() => setOpen((prev) => !prev)}
			>
				<div>{trigger}</div>
				<div>
					{open ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>{' '}
			</div>
			{open && <div className={classes.body}>{children}</div>}
		</div>
			</>
	)
}
