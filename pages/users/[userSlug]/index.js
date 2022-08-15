import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import UserDetail from 'components/user/user-detail'
import useSWR from 'swr'
import { Ring } from 'components/ui/spinner'

import classes from 'styles/account.module.css'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Footer from 'components/layout/footer'
import Main from 'components/layout/main'
import Head from 'next/head'

function AccountPage() {
	const { data: session } = useSession()
	const {
		data: { user },
	} = useSWR(session?.user ? `/api/users/${session?.user.id}` : null, {
		fallbackData: { user: {} },
	})

	return (
		<>
			<Head>
				<title>{user.name ? `${user.name} • Waiter` : 'Waiter'}</title>
				{/* <meta name="description" content={restaurant.description} /> */}
				<meta property="og:title" content={`Search • Waiter`} />
				{/* <meta
					property="og:description"
					content={restaurant.description}
				/> */}
				{/* <meta property="og:image" content={restaurant.image} />
				<meta property="og:url" content="https://www.waiter.so/search" /> */}
			</Head>
			<Container>
				<Header />
				<Main>
					<h1>Compte</h1>
					{!user.id ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flex: 1,
							}}
						>
							<Ring />
						</div>
					) : (
						<>
							<UserDetail user={user} />
							<div
								className={classes.links}
								style={
									{
										// display: 'flex',
										// flexDirection: 'column',
										// gap: '1rem',
									}
								}
							>
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
								{/* <Link href="/notifications">
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
								</Link> */}
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
												process.env.NEXT_PUBLIC_DOMAIN,
										})
									}
									style={{ width: '100%' }}
									className="secondary"
								>
									Log out
								</button>
							</div>
						</>
					)}
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'account'])),
		},
	}
}

// AccountPage.auth = true
export default AccountPage
