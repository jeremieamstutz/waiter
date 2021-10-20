import { useSession, signOut } from 'next-auth/client'

import Header from 'components/layout/header'

export default function AccountPage({ user }) {
	const [session, loading] = useSession()

	return (
		<>
			<div className="container">
				<h1>Account</h1>
				<p>{user.name}</p>
				<select>
					<option>Français</option>
				</select>
				{session && (
					<div style={{ padding: '1rem' }}>
						<button
							onClick={signOut}
							style={{ width: '100%' }}
							className="secondary"
						>
							Sign out
						</button>
					</div>
				)}
			</div>
			<Header />
		</>
	)
}

export async function getServerSideProps() {
	return {
		props: {
			user: {
				name: 'Jérémie',
			},
		},
	}
}
