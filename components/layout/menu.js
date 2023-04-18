import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import { useFlags } from 'contexts/flags'

import LanguageSelector from 'components/translation/language-selector'

import SearchIcon from 'components/icons/search'
import HeartIcon from 'components/icons/heart'

import classes from './menu.module.css'

export default function Menu() {
	const { t } = useTranslation()
	const { data: session, status } = useSession()
	const router = useRouter()
	const { flags } = useFlags()

	const path = router.pathname

	return (
		<div className={classes.menu}>
			<nav className={classes.navbar}>
				<div className={classes.link}>
					<LanguageSelector />
				</div>
				{status === 'authenticated' &&
					session.user.role === 'admin' && (
						<button
							className={`text ${classes.link} ${classes.text}`}
							onClick={() =>
								router.push(
									{
										pathname: router.pathname,
										query: {
											...router.query,
											showFlags: true,
										},
									},
									undefined,
									{ shallow: true },
								)
							}
						>
							Flags
						</button>
					)}
				{flags.feedbacks &&
					status === 'authenticated' &&
					(session.user.role === 'admin' ? (
						<Link
							href="/feedbacks"
							className={`${classes.link} ${classes.text} ${
								path.startsWith('/favorites')
									? classes.active
									: ''
							}`}
						>
							<span className={classes.text}>Feedbacks</span>
						</Link>
					) : (
						<>
							<button
								onClick={() =>
									router.push(
										{
											pathname: router.pathname,
											query: {
												...router.query,
												showFeedback: true,
											},
										},
										undefined,
										{ shallow: true },
									)
								}
								className={`text ${classes.text} ${classes.link} ${classes.feedback}`}
							>
								Feedback
							</button>
						</>
					))}
				{status === 'authenticated' && flags.favorites && (
					<>
						<Link
							href="/favorites"
							aria-label="Favorites page"
							className={`${classes.link} ${
								path.startsWith('/favorites')
									? classes.active
									: ''
							}`}
						>
							<HeartIcon
								type="outline"
								width={20}
								strokeWidth={2.2}
								className={classes.icon}
							/>
							<span className={classes.text}>
								{t('common:header.favorites')}
							</span>
						</Link>
						{/* {flags.bookings && (
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
				{status === 'authenticated' && (
					<>
						<Link
							href="/search"
							aria-label="Search page"
							className={`${classes.link} ${
								path.startsWith('/search') ? classes.active : ''
							}`}
						>
							<SearchIcon
								type="outline"
								width={20}
								strokeWidth={2.2}
								className={classes.icon}
							/>
							<span className={classes.text}>
								{t('common:header.search')}
							</span>
						</Link>
						<Link
							href={{
								pathname: '/users/[userSlug]',
								query: { userSlug: session.user.id },
							}}
							aria-label="Account page"
							className={`${classes.link} ${
								path.startsWith('/users') ? classes.active : ''
							}`}
						>
							<div
								style={{
									width: '2.75rem',
									height: '2.75rem',
									borderRadius: '50%',
									overflow: 'hidden',
									border: '1px solid #ddd',
								}}
							>
								<Image
									alt={`${session.user.firstName} ${session.user.lastName}`}
									src={
										session.user.image ||
										'/images/defaults/user.png'
									}
									width={32}
									height={32}
									sizes="32px"
									style={{
										display: 'block',
										width: '100%',
										height: 'auto',
										aspectRatio: 1,
										objectFit: 'cover',
									}}
								/>
							</div>
						</Link>
					</>
				)}
				{status === 'unauthenticated' && (
					<Link
						href={`/login?callbackUrl=${window.location.href}`}
						className="button primary"
						style={{
							fontSize: '1.125rem',
							flexShrink: 0,
							minWidth: '6rem',
							width: 'auto',
							marginLeft: '1rem',
						}}
					>
						{t('common:header.login')}
					</Link>
				)}
			</nav>
		</div>
	)
}
