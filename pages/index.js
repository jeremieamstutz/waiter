import Link from 'next/link'
import { getAllRestaurants } from 'utils/db'
import Image from 'next/image'

import RestaurantCard from 'components/restaurant/restaurant-card'
import Header from 'components/layout/header'

import classes from 'styles/home.module.css'

export default function Home({ restaurants }) {
	restaurants = [...restaurants, ...restaurants, ...restaurants]

	return (
		<>
			<div className={classes.container}>
				<h1>Waiter</h1>
				{/* <div>Mon restaurant</div> */}
				<h2 style={{margin: 0}}>Recommandations</h2>
				<div style={{ display: 'flex', gap: '1rem', margin: '0 -1rem', padding: '1rem', overflow: 'auto', scrollSnapType: 'x mandatory', scrollPadding: '1rem'}}>
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
								<RestaurantCard restaurant={restaurant}/>
							</a>
						</Link>
					))}
				</div>
				<h2 style={{margin: 0}}>Burgers</h2>
				<div style={{ display: 'flex', gap: '1rem', margin: '0 -1rem', padding: '1rem', overflow: 'auto', scrollSnapType: 'x mandatory', scrollPadding: '1rem'}}>
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
								<RestaurantCard restaurant={restaurant}/>
							</a>
						</Link>
					))}
				</div>
				<div className={classes.cta}>
					<h3>Et votre restaurant ?</h3>
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
