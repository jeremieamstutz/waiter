import Container from 'components/layout/container'
import { signOut } from 'next-auth/react'

export default function LogoutPage() {
	return (
		<Container>
			<h1>Log out</h1>
			<p style={{marginTop: 0}}>Are you sure you want to log out?</p>
			<button
				onClick={() =>
					signOut({ callbackUrl: process.env.NEXT_PUBLIC_DOMAIN })
				}
			>
				Log out
			</button>
		</Container>
	)
}
