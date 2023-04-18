import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { User } from 'db/models'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Footer from 'components/layout/footer'

import UserDetail from 'components/user/user-detail'
import EditUserModal from 'components/user/edit-user-modal'

import classes from 'styles/account.module.css'

function AccountPage({ user }) {
	const { data: session } = useSession()
	const router = useRouter()

	return (
		<>
			<Head>
				<title>{`${user.firstName} ${user.lastName} • Waiter`}</title>
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
				{router.query.editProfile && (
					<EditUserModal user={user} onClose={() => router.back()} />
				)}
				<Header />
				<Main style={{ maxWidth: '60rem', alignSelf: 'center' }}>
					<h1>Compte</h1>
					<>
						<UserDetail user={user} />
						{session?.user.id === user.id && (
							<div
								style={{
									display: 'flex',
									gap: '1rem',
									flexWrap: 'wrap',
								}}
							>
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
								{/* <button>Payments</button>
								<button>Security</button>
								<button>Notifications</button>
								<button>Privacy</button>
								<button>Referral</button>
								<Link href="/orders">
									<a className="button">Orders</a>
								</Link>
								<Link href="/loyalty">
									<a className="button">Loyalty</a>
								</Link> */}
							</div>
						)}
					</>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ locale, params }) {
	const { userId } = params
	const user = await User.findOne({ where: { id: userId } })

	return {
		props: {
			user: JSON.parse(JSON.stringify(user)),
			...(await serverSideTranslations(locale, ['common', 'user'])),
		},
	}
}

export default AccountPage
