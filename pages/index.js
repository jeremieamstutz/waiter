import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { getAllRestaurants } from 'pages/api/restaurants'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Footer from 'components/layout/footer'
import RestaurantList from 'components/restaurant/restaurant-list'

import classes from 'styles/home.module.css'

export default function HomePage({ restaurants }) {
	const { t } = useTranslation()
	const router = useRouter()
	return (
		<>
			<Head>
				<title>{t('home:meta.title')}</title>
				<meta name="description" content={t('home:meta.description')} />
				<meta property="og:title" content="Waiter" />
				<meta
					property="og:description"
					content={t('home:meta.description')}
				/>
				<meta property="og:url" content="https://www.waiter.so" />
				<meta property="og:type" content="restaurants" />
			</Head>
			<Container>
				<Header />
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<h1>{t('home:title')}</h1>
					<select
						value={router.locale}
						onChange={(event) =>
							router.push(router.asPath, undefined, {
								locale: event.target.value,
							})
						}
						style={{
							outline: 'none',
							padding: '0.75rem 0.5rem',
							minWidth: 'unset',
							width: 'fit-content',
							fontFamily: 'Gilroy',
							color: '#222',
							textAlign: 'right',
							background: 'white',
						}}
					>
						<option value="en">EN</option>
						<option value="fr">FR</option>
						<option value="de">DE</option>
					</select>
				</div>
				<RestaurantList
					restaurants={restaurants}
					list={{
						name: 'Restaurants',
					}}
				/>
				{/* <button
					className="secondary"
					style={{
						position: 'fixed',
						bottom: '4rem',
						left: '50%',
						transform: 'translateX(-50%)',
						// padding: 0
					}}
				>
					Show map
				</button> */}
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	const restaurants = await getAllRestaurants()

	return {
		props: {
			restaurants: JSON.parse(JSON.stringify(restaurants)),
			...(await serverSideTranslations(locale, [
				'common',
				'home',
				'restaurant',
			])),
		},
		revalidate: 5,
	}
}
