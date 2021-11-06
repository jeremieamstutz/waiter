import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import UserDetail from 'components/user/user-detail'

export default function AccountPage() {
	const { status } = useSession()
	
	return (
		<>
			<Container>
				<h1>Account</h1>
				{status === 'authenticated' && (
					<>
						<UserDetail />
						{/* <select>
							<option>Français</option>
						</select> */}
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
							<Link href={{ pathname: '/terms' }}>
								<a className="button">Terms</a>
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
			</Container>
			<Header />
		</>
	)
}
