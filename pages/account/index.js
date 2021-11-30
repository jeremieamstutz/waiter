import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import UserDetail from 'components/user/user-detail'
import useSWR from 'swr'
import { Ring } from 'components/ui/spinner'

import classes from 'styles/account.module.css'

export default function AccountPage() {
	const { data: session } = useSession()
	const {
		data: { user },
	} = useSWR(session?.user ? `/api/users/${session?.user.id}` : null, {
		fallbackData: { user: {} },
	})

	return (
		<>
			<Container>
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
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
							}}
						>
							<Link href="/account/edit">
								<a className="button">Edit profile</a>
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
							<Link href={{ pathname: '/terms' }}>
								<a className={classes.terms}>
									Terms of Service
								</a>
							</Link>
						</div>
					</>
				)}
			</Container>
			<Header />
		</>
	)
}
