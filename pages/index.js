import Link from 'next/link'
import Head from 'next/head'

import { getAllRestaurants } from 'pages/api/restaurants'
import { groupBy } from 'utils/processing'

import Container from 'components/layout/container'
import RestaurantList from 'components/restaurant/restaurant-list'
import Header from 'components/layout/header'

import classes from 'styles/home.module.css'

export default function HomePage({ restaurants }) {
	return (
		<>
			<Head>
				<title>Waiter</title>
				<meta
					name="description"
					content="De choix du restaurant, jusqu’au règlement de l’addition, en passant par la commande, Waiter est là pour vous."
				/>
				<meta property="og:title" content="Waiter" />
				<meta
					property="og:description"
					content="De choix du restaurant, jusqu’au règlement de l’addition, en passant par la commande, Waiter est là pour vous."
				/>
				<meta property="og:url" content="https://www.waiter.so" />
				<meta property="og:type" content="restaurants" />
			</Head>
			<Container>
				<h1>Accueil</h1>
				{/* <p>Commandez en ligne. Régalez vous sur place.</p> */}
				{/* <div>Mon restaurant</div> */}
				{/* <RestaurantList
					list={{
						name: 'Recommandations',
						description: 'Ces restaurants risquent de vous plaire',
					}}
					restaurants={restaurants}
				/> */}
				{[...groupBy(restaurants, (restaurant) => restaurant.city)].map(
					([key, value]) => (
						<RestaurantList
							key={key}
							restaurants={value}
							list={{
								name: key,
							}}
						/>
					),
				)}
				<div className={classes.cta}>
					<h2>Et votre restaurant ?</h2>
					<p>
						Découvrez les nombreux avantages que Waiter peut vous
						offrir
					</p>
					<Link
						href={{
							pathname: '/advantages',
						}}
					>
						<a className="button secondary">Voir</a>
					</Link>
				</div>
			</Container>
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
		revalidate: 5,
	}
}
