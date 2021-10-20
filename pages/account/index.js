import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'

import Header from 'components/layout/header'

export default function AccountPage() {
	const [session, loading] = useSession()

	return (
		<>
			<div className="container">
				<h1>Account</h1>
				<img src={session?.user.image} />
				<h2>{session?.user.name}</h2>
				<p>{session?.user.email}</p>
				<select>
					<option>Français</option>
				</select>
				<p>
					<Link href={{ pathname: '/terms' }}>
						<a>Terms & Privacy</a>
					</Link>
				</p>
				{session && (
					<div style={{ padding: '1rem' }}>
						<button
							onClick={() => signOut({ callbackUrl: '/' })}
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
