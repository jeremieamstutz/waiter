import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
	const [session, loading] = useSession()
	// console.log(session)

	return (
		<div>
			{!loading && !session ? (
				<button
					onClick={() =>
						signIn(null, {
							callbackUrl: 'http://localhost:3000/test',
						})
					}
				>
					Sign in
				</button>
			) : (
				<button
					onClick={() =>
						signOut({ callbackUrl: 'http://localhost:3000/test' })
					}
				>
					Sign out
				</button>
			)}
			<Link
				href={{
					pathname: '/[citySlug]/[restaurantSlug]',
					query: {
						citySlug: 'lausanne',
						restaurantSlug: 'holycow'
					},
				}}
			>
				HolyCow
			</Link>
		</div>
	)
}
