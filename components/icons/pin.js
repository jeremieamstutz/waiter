export default function PinIcon(props) {
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
						d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
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
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			)
	}
}
