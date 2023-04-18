import useSWR from 'swr'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Footer from 'components/layout/footer'

import RestaurantList from 'components/restaurant/restaurant-list'
import { Ring } from 'components/ui/spinner'
import Head from 'next/head'

function FavoritesPage() {
	const { data: restaurants, error } = useSWR('/api/restaurants/favorites', {
		fallbackData: [],
	})

	return (
		<>
			<Head>
				<title>{`Favorites • Waiter`}</title>
				{/* <meta name="description" content={restaurant.description} /> */}
				<meta property="og:title" content={`Favorites • Waiter`} />
				{/* <meta
					property="og:description"
					content={restaurant.description}
				/> */}
				{/* <meta property="og:image" content={restaurant.image} />
				<meta property="og:url" content="https://www.waiter.so/search" /> */}
			</Head>
			<Container>
				<Header />
				<Main>
					<h1>Favoris</h1>
					{!error &&
						(!restaurants ? (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flex: 1,
								}}
							>
								<Ring />
							</div>
						) : restaurants.length > 0 ? (
							<RestaurantList
								restaurants={restaurants}
								list={{ name: 'Restaurants' }}
							/>
						) : (
							<p>No favorite restaurant yet</p>
						))}
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'restaurant'])),
		},
	}
}

FavoritesPage.auth = true
export default FavoritesPage
