import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'

import classes from './menu.module.css'
import { useRouter } from 'next/router'

export default function Menu() {
	const { data: session, status } = useSession()

	const router = useRouter()
	const path = router.pathname

	return (
		<div className={classes.menu}>
			{status === 'unauthenticated' && (
				<button
					className="button"
					onClick={signIn}
					style={{ flex: 1, margin: '0.5rem 1rem' }}
				>
					Log in
				</button>
			)}
			{status === 'authenticated' && (
				<nav className={classes.navbar}>
					<Link href="/">
						<a
							className={
								path === '/'
									? classes.active
									: ''
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
						</a>
					</Link>
					<Link href="/search">
						<a
							className={
								path.startsWith('/search') ? classes.active : ''
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</a>
					</Link>
					<Link href="/account/favorites">
						<a
							className={
								path.startsWith('/account/favorites')
									? classes.active
									: ''
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
								/>
							</svg>
						</a>
					</Link>
					<Link href="/account/bookings">
						<a
							className={
								path.startsWith('/account/bookings')
									? classes.active
									: ''
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</a>
					</Link>
					<Link href="/account">
						<a
							className={
								path.startsWith('/account') &&
								!path.endsWith('/bookings') &&
								!path.endsWith('/favorites')
									? classes.active
									: ''
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</a>
					</Link>
				</nav>
			)}
		</div>
	)
}
