export default function ClockIcon(props) {
	switch (props.type || 'solid') {
		case 'solid':
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
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
						clipRule="evenodd"
					/>
				</svg>
			)
		case 'outline':
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
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			)
	}
}
