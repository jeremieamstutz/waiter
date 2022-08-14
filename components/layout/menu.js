import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import classes from './menu.module.css'
import { useRouter } from 'next/router'
import { useOrder } from 'contexts/order'
import Logo from 'components/icons/logo'

import flags from 'flags.json'

export default function Menu() {
	const { t } = useTranslation()
	const { data: session, status } = useSession()
	const orderContext = useOrder()
	const router = useRouter()
	const path = router.pathname

	const [showMenu, setShowMenu] = useState(false)

	return (
		<div className={classes.menu}>
			<Link href="/">
				<a>
					<Logo />
				</a>
			</Link>
			{/* <div
				style={{
					background: '#222',
					padding: '0.75rem 1.5rem',
					borderRadius: '0.5rem',
					display: 'flex',
					justifyContent: 'space-between',
					width: '20rem',
					position: 'fixed',
					top: '1rem',
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={20}
					height={20}
					viewBox="0 0 20 20"
					fill="white"
				>
					<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
				</svg>
				<span style={{ color: 'white', fontSize: '1.125rem' }}>
					12 items
				</span>
				<span style={{ color: 'white', fontSize: '1.125rem' }}>
					CHF 176.80
				</span>
			</div> */}
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
			{/* {status === 'unauthenticated' && (
				<nav className={classes.navbar}>
					<button
						className={`button ${classes.login}`}
						onClick={signIn}
						style={{ flex: 1 }}
					>
						Se connecter
					</button>
				</nav>
			)} */}
			<nav className={classes.navbar} style={{ width: 'fit-content' }}>
				<Link href="/">
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
				</Link>
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
						{flags.booking && (
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
						)}
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
							style={{ position: 'relative' }}
							// onClick={(event) => setShowMenu(!showMenu)}
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
							{showMenu && (
								<div className={classes.links}>
									<Link href="/settings">
										<a className="button">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
													clipRule="evenodd"
												/>
											</svg>
											<span>Settings</span>
										</a>
									</Link>
									<Link href="/notifications">
										<a className="button">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
											</svg>
											<span>Notifications</span>
										</a>
									</Link>
									<Link href="/favorites">
										<a className="button">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
													clipRule="evenodd"
												/>
											</svg>
											<span>Favorites</span>
										</a>
									</Link>
									<Link href="/bookings">
										<a className="button">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
													clipRule="evenodd"
												/>
											</svg>
											<span>Bookings</span>
										</a>
									</Link>
									<Link href="/orders">
										<a className="button">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
											</svg>
											<span>Orders</span>
										</a>
									</Link>
									<Link href="/loyalty">
										<a className="button">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
													clipRule="evenodd"
												/>
											</svg>
											<span>Loyalty</span>
										</a>
									</Link>
									<button
										onClick={() =>
											signOut({
												callbackUrl:
													process.env
														.NEXT_PUBLIC_DOMAIN,
											})
										}
										style={{ width: '100%' }}
										className="secondary"
									>
										Log out
									</button>
								</div>
							)}
						</a>
					</Link>
				)}
				{status === 'unauthenticated' && (
					<button
						onClick={signIn}
						style={{
							marginLeft: '1rem',
							fontSize: '1.125rem',
							flexShrink: 0,
							minWidth: '6rem',
						}}
					>
						{t('common:header.login')}
					</button>
				)}
			</nav>
		</div>
	)
}
