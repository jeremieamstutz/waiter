export default function ChevronIcon(props) {
	switch (props.type || 'solid') {
		case 'solid':
			switch (props.direction || 'right') {
				case 'right': {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="currentColor"
							{...props}
						>
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					)
				}
				case 'left': {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="currentColor"
							{...props}
						>
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					)
				}
				case 'up': {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="currentColor"
							{...props}
						>
							<path
								fillRule="evenodd"
								d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
					)
				}
				case 'down': {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="currentColor"
							{...props}
						>
							<path
								fillRule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					)
				}
			}
		case 'outline': {
			switch (props.direction || 'right') {
				case 'right': {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
							fill="none"
							{...props}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					)
				}
				case 'left': {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
							fill="none"
							{...props}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					)
				}
				case 'up': {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
							fill="none"
							{...props}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 15l7-7 7 7"
							/>
						</svg>
					)
				}
				case 'down': {
					return (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
							fill="none"
							{...props}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					)
				}
			}
		}
	}
}
