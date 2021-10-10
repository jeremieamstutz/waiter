import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import { getAllRestaurants } from 'utils/db'
import Image from 'next/image'

import classes from 'styles/home.module.css'
import Footer from 'components/layout/footer'

export default function Home({ restaurants }) {
	const [session, loading] = useSession()
	// console.log(session)

	return (
		<>
			<div className={classes.container}>
				<h1 style={{}}>waiter.so</h1>
				<h2>Burgers</h2>
				<div style={{ display: 'flex' }}>
					{restaurants.map((restaurant) => (
						<Link
							href={{
								pathname: '/[citySlug]/[restaurantSlug]',
								query: {
									citySlug: restaurant.citySlug,
									restaurantSlug: restaurant.restaurantSlug,
								},
							}}
						>
							<a>
								<div>
									<div className={classes.image} style={{display: 'flex', gap: '1rem', overflowX: 'scroll'}}>
										<Image
											src={restaurant.image}
											alt={restaurant.name}
											objectFit="cover"
											objectPosition="left"
											width={176}
											height={234}
										/>
										<Image
											src={restaurant.image}
											alt={restaurant.name}
											objectFit="cover"
											objectPosition="left"
											width={176}
											height={234}
										/>
									</div>
									<h3 className={classes.title}>
										{restaurant.name}
									</h3>
									<p className={classes.description}>
										{restaurant.description}
									</p>
								</div>
							</a>
						</Link>
					))}
				</div>
				{!loading &&
					(!session ? (
						<button
							onClick={() =>
								signIn(null, {
									callbackUrl: 'http://localhost:3000/test',
								})
							}
							style={{
								position: 'fixed',
								bottom: '1rem',
								left: '1rem',
								right: '1rem',
							}}
						>
							Sign in
						</button>
					) : (
						<button
							onClick={() =>
								signOut({
									callbackUrl: 'http://localhost:3000/test',
								})
							}
							style={{
								position: 'fixed',
								bottom: '1rem',
								left: '1rem',
								right: '1rem',
							}}
						>
							Sign out
						</button>
					))}
			</div>
			<Footer />
		</>
	)
}

export async function getStaticProps() {
	const restaurants = await getAllRestaurants()

	return {
		props: {
			restaurants,
		},
	}
}
