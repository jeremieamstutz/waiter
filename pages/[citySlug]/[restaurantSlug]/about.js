import Image from 'next/image'

import Footer from 'components/layout/footer'

import { getRestaurantsSlugs, getRestaurant } from 'utils/db'

import classes from 'styles/about.module.css'

export default function AboutPage({ restaurant }) {
	return (
		<>
			<div className={classes.container}>
				<h1>About {restaurant.name}</h1>
				<p>{restaurant.description}</p>
				<Image
					src={`${process.env.NEXT_PUBLIC_DOMAIN}/api/qrcode?url=${process.env.NEXT_PUBLIC_DOMAIN}/${restaurant.citySlug}/${restaurant.restaurantSlug}`}
					alt={`${restaurant.name}'s QR code`}
					width={375}
					height={375}
				/>
			</div>
			<Footer />
		</>
	)
}

export async function getStaticPaths() {
	const restaurantsSlug = await getRestaurantsSlugs()
	return {
		paths: restaurantsSlug.map((restaurant) => ({ params: restaurant })),
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }) {
	const { restaurantSlug, citySlug } = params
	const restaurant = await getRestaurant({ restaurantSlug, citySlug })

	console.log(restaurant)
	if (!restaurant) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			restaurant: restaurant,
		},
		revalidate: 60
	}
}