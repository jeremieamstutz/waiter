import { signOut } from 'next-auth/react'

export default function LogoutPage() {
	return (
		<div
			className="container"
			style={{ display: 'flex', flexDirection: 'column' }}
		>
			<h1>Log out</h1>
			<p>Are you sure you want to log out?</p>
			<button
				onClick={() =>
					signOut({ callbackUrl: process.env.NEXT_PUBLIC_DOMAIN })
				}
			>
				Log out
			</button>
		</div>
	)
}
