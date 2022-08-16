import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import classes from './menu.module.css'
import { useRouter } from 'next/router'

export default function Menu() {
	const { t } = useTranslation()
	const { data: session, status } = useSession()
	const router = useRouter()
	const path = router.pathname

	return (
		<div className={classes.menu}>
			{/* <div
				style={{
					flex: 1,
					maxWidth: '30rem',
					display: 'flex',
					alignItems: 'center',
					background: '#eee',
					borderRadius: '0.5rem',
					padding: '0 1rem',
				}}
			>
				<svg
					style={{ flexShrink: 0 }}
					xmlns="http://www.w3.org/2000/svg"
					width={18}
					height={18}
					viewBox="0 0 20 20"
					fill="#666"
				>
					<path
						fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd"
					/>
				</svg>
				<input
					type="text"
					style={{ border: 'none', outline: 'none' }}
					placeholder="Restaurant"
				/>
				<span style={{ color: '#666' }}>|</span>
				<input
					type="text"
					style={{
						border: 'none',
						outline: 'none',
						marginLeft: '1rem',
					}}
					placeholder="Lieu"
				/>
			</div> */}
			<nav className={classes.navbar}>
				{/* <Link href="/">
					<a
						aria-label="Home page"
						className={path === '/' ? classes.active : ''}
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
				</Link> */}
				<Link href="/search">
					<a
						aria-label="Search page"
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
				{status === 'authenticated' && (
					<>
						<Link href="/favorites">
							<a
								aria-label="Favorites page"
								className={
									path.startsWith('/favorites')
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
						{/* {flags.booking && (
							<Link href="/bookings">
								<a
									aria-label="Bookings page"
									className={
										path.startsWith('/bookings')
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
						)} */}
					</>
				)}
				{/* <Link href="/loyalty">
					<a
						aria-label="Loyalty page"
						className={
							path.startsWith('/loyalty') ? classes.active : ''
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
							/>
						</svg>
					</a>
				</Link> */}

				{/* <Link href="/messages">
					<a className={path === '/messages' ? classes.active : ''}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
							/>
						</svg>
					</a>
				</Link> */}
				{/* {flags.ordering && (
					<Link href="/checkout">
						<a
							aria-label="Cart page"
							className={`${classes.cart} ${
								path === '/checkout' ? classes.active : ''
							}`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							{orderContext.items.length > 0 && (
								<div className={classes.items}>
									{orderContext.items
										.reduce(
											(count, item) =>
												count + item.quantity,
											0,
										)
										.toLocaleString()}
								</div>
							)}
						</a>
					</Link>
				)} */}
				{status === 'authenticated' && (
					<Link
						href={{
							pathname: '/users/[userSlug]',
							query: { userSlug: session.user.id },
						}}
					>
						<a
							aria-label="Account page"
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
				)}
				{status === 'unauthenticated' && (
					<Link href={`/login?callbackUrl=${window.location.href}`}>
						<a
							className="button"
							style={{
								marginLeft: '1rem',
								fontSize: '1.125rem',
								flexShrink: 0,
								minWidth: '6rem',
							}}
						>
							{t('common:header.login')}
						</a>
					</Link>
				)}
			</nav>
		</div>
	)
}
