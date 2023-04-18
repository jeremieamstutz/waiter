import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Form, Formik, useFormikContext } from 'formik'
import track from 'utils/track'

import useDebounce from 'hooks/useDebounce'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Footer from 'components/layout/footer'

import { filter } from 'utils/search'

import Input from 'components/form/input'
import FiltersModal from 'components/search/filters-modal'
import RestaurantList from 'components/restaurant/restaurant-list'

import SearchIcon from 'components/icons/search'
import XIcon from 'components/icons/x'
import { Flag, Restaurant } from 'db/models'

function FiltersSummary() {
	const { t } = useTranslation()
	const router = useRouter()
	const { setFieldValue, values, dirty, resetForm } = useFormikContext()
	const [initialized, setInitialized] = useState(false)

	// useEffect(() => {
	// 	const { query, cuisines } = router.query

	// 	if (!router.isReady || initialized) {
	// 		return
	// 	}

	// 	if (query) {
	// 		setFieldValue('query', query)
	// 		setInitialized(true)
	// 	}

	// 	if (cuisines) {
	// 		setFieldValue(
	// 			'cuisines',
	// 			Array.isArray(cuisines) ? cuisines : [cuisines],
	// 		)
	// 		setInitialized(true)
	// 	}
	// }, [initialized, setFieldValue, router])

	// useEffect(() => {
	// 	const query = {
	// 		...router.query,
	// 		query: values.query,
	// 		cuisines: values.cuisines,
	// 	}

	// 	if (!values.query) delete query.query

	// 	router.replace(
	// 		{
	// 			query,
	// 		},
	// 		undefined,
	// 		{ shallow: true },
	// 	)
	// }, [router, values])

	if (!dirty) return

	return (
		<div
			style={{
				marginTop: '1rem',
				display: 'flex',
				gap: '0.5rem',
				alignItems: 'center',
				flexWrap: 'wrap',
			}}
		>
			{Object.entries(values).map(([key, value]) => {
				if (key === 'cuisines' && value.length > 0) {
					return value.map((cuisine) => (
						<div
							key={cuisine}
							style={{
								padding: '0 0 0 1rem',
								height: '2.5rem',
								color: '#fff',
								background: '#555',
								borderRadius: '1.25rem',
								display: 'flex',
								alignItems: 'center',
								whiteSpace: 'nowrap',
							}}
						>
							{t('restaurant:cuisines.' + cuisine)}
							<span
								style={{
									alignSelf: 'stretch',
									display: 'flex',
									alignItems: 'center',
									padding: '1rem',
									cursor: 'pointer',
								}}
								onClick={() => {
									setFieldValue(
										'cuisines',
										value.filter(
											(option) => option !== cuisine,
										),
									)
								}}
							>
								<XIcon fill="white" width={16} height={16} />
							</span>
						</div>
					))
				}
			})}
			<button
				className="text"
				onClick={resetForm}
				style={{ marginLeft: '0.5rem', flexShrink: 0 }}
			>
				Clear all
			</button>
		</div>
	)
}

function FilteredRestaurantList({ restaurants }) {
	const { t } = useTranslation()
	const { values } = useFormikContext()

	const debouncedQuery = useDebounce(values.query, 2000)

	useEffect(() => {
		if (debouncedQuery) {
			track.event({
				event_category: 'search',
				event_name: 'search_query',
				event_label: debouncedQuery,
			})
		}
	}, [debouncedQuery])

	useEffect(() => {
		if (values.cuisines.length > 0) {
			track.event({
				event_category: 'search',
				event_name: 'search_cuisines',
				event_label: values.cuisines,
			})
		}
	}, [values.cuisines])

	let filteredRestaurants = restaurants.filter(
		(restaurant) =>
			(values?.query.length > 0
				? filter(restaurant.name, values.query) ||
				  //   filter(restaurant.description, values.search) ||
				  filter(restaurant.address.city, values.query)
				: true) &&
			(values?.cuisines.length > 0
				? values.cuisines.includes(restaurant.cuisine)
				: true),
	)

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h2 style={{ fontSize: '1.25rem', margin: '1.5rem 0 1rem' }}>
					{filteredRestaurants.length +
						t('search:count') +
						restaurants.length}
				</h2>
				{/* <div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
						margin: '0 0 1rem',
					}}
				>
					<div
						style={{
							fontSize: '1.125rem',
						}}
					>
						Trier par
					</div>
					<select style={{ width: '10rem' }}>
						<option>Distance</option>
					</select>
				</div> */}
			</div>
			<RestaurantList restaurants={filteredRestaurants} />
		</>
	)
}

export default function SearchPage({ restaurants }) {
	const { t } = useTranslation()

	const [showFilters, setShowFilters] = useState(false)

	return (
		<>
			<Head>
				<title>{`Search • Waiter`}</title>
				{/* <meta name="description" content={restaurant.description} /> */}
				<meta property="og:title" content={`Search • Waiter`} />
				{/* <meta
					property="og:description"
					content={restaurant.description}
				/> */}
				{/* <meta property="og:image" content={restaurant.image} />
				<meta property="og:url" content="https://www.waiter.so/search" /> */}
			</Head>
			<Container
				style={
					{
						// maxWidth: '1440px'
					}
				}
			>
				<Header />
				<Main>
					<h1>{t('search:title')}</h1>
					<section>
						<Formik
							initialValues={{
								query: '',
								cuisines: [],
								// price: [5, 70],
							}}
						>
							<>
								<Form
									style={{
										flexDirection: 'row',
										flexWrap: 'wrap',
									}}
								>
									<Input
										name="query"
										arial-label="Query"
										placeholder={t('search:query')}
										autoComplete="off"
										prefix={
											<SearchIcon
												type="outline"
												width={18}
												height={18}
											/>
										}
									/>
									{showFilters && (
										<FiltersModal
											onClose={() =>
												setShowFilters(false)
											}
										/>
									)}
									<button
										type="button"
										onClick={() => {
											setShowFilters(true)
											track.event({
												event_category: 'search',
												event_name: 'show_filters',
											})
										}}
										className="secondary"
									>
										{t('search:filters')}
									</button>
								</Form>
								<FiltersSummary />
								<FilteredRestaurantList
									restaurants={restaurants}
								/>
							</>
						</Formik>
						{/* <input
								type="search"
								placeholder="Restaurant"
								value={search ? search.query : ''}
								onChange={handleInput}
								autoFocus
								autoComplete="off"
								style={{ flex: 3 }}
							/>
							<input
								type="search"
								placeholder="Lieu"
								style={{ flex: 3 }}
							/> */}
					</section>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	const restaurants = await Restaurant.findAll({
		include: ['address', 'images'],
	})
	const flags = await Flag.findAll({ order: ['key'] })

	return {
		props: {
			restaurants: JSON.parse(JSON.stringify(restaurants)),
			flags: JSON.parse(JSON.stringify(flags)),
			...(await serverSideTranslations(locale, [
				'common',
				'search',
				'restaurant',
			])),
		},
	}
}
