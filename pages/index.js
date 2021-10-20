import Link from 'next/link'
import { getAllRestaurants } from 'utils/db'
import Image from 'next/image'

import classes from 'styles/home.module.css'
import Header from 'components/layout/header'

export default function Home({ restaurants }) {
	return (
		<>
			<div className={classes.container}>
				<h1>Waiter</h1>
				{/* <div>Mon restaurant</div> */}
				<h2>Burgers</h2>
				<div style={{ display: 'flex' }}>
					{restaurants.map((restaurant, index) => (
						<Link
							href={{
								pathname: '/[citySlug]/[restaurantSlug]',
								query: {
									citySlug: restaurant.citySlug,
									restaurantSlug: restaurant.restaurantSlug,
								},
							}}
							key={index}
						>
							<a>
								<div>
									<div
										className={classes.image}
										style={{
											display: 'flex',
											gap: '1rem',
										}}
									>
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
				<div className={classes.cta}>
					<h3>Ajouter votre restaurant ?</h3>
					<p>Découvrez les nombreux avantages que Waiter peut vous offrir</p>
					<Link
						href={{
							pathname: '/advantages',
						}}
					>
						<a className="button secondary">Voir</a>
					</Link>
				</div>
			</div>
			<Header />
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
