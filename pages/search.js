import { useRef, useState } from 'react'
import useSWR from 'swr'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import useSessionStorage from 'hooks/useSessionStorage'
import useScrollRestoration from 'hooks/useScrollRestauration'
import useDebounce from 'hooks/useDebounce'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Footer from 'components/layout/footer'

import { Ring } from 'components/ui/spinner'
import FiltersModal from 'components/search/filters-modal'
import RestaurantList from 'components/restaurant/restaurant-list'

export default function SearchPage() {
	const { t } = useTranslation()
	const [needDebounce, setNeedDebounce] = useState(false)
	const initialSearch = {
		query: '',
		cuisine: '',
		initial: true,
	}
	const [search, setSearch] = useSessionStorage('search', initialSearch)
	const debouncedSearch = useDebounce(search, 150, {
		debounce: needDebounce,
	})
	const cuisinesRef = useRef()

	const resetCuisineScroll = useScrollRestoration(cuisinesRef, 'cuisines')

	const restaurantListRef = useRef()
	const itemListRef = useRef()
	function resetScroll() {
		if (restaurantListRef.current) {
			restaurantListRef.current.resetScroll()
		}
		if (itemListRef.current) {
			itemListRef.current.resetScroll()
		}
	}

	function handleInput(event) {
		setNeedDebounce(true)
		setSearch((search) => ({ ...search, query: event.target.value }))
		resetScroll()
	}

	function handleCuisineChange(event) {
		const selection = event.target.textContent
		if (selection !== search.cuisine) {
			setSearch((search) => ({ ...search, cuisine: selection }))
		} else {
			setSearch((search) => ({ ...search, cuisine: '' }))
		}
		resetScroll()
	}

	function handleResetSearch() {
		setSearch(initialSearch)
		resetScroll()
		resetCuisineScroll()
	}

	const { data } = useSWR(
		debouncedSearch
			? `/api/search?query=${debouncedSearch.query}&cuisine=${debouncedSearch.cuisine}`
			: null,
	)

	const { restaurants } = data || { restaurants: [] }

	const [showFilters, setShowFilters] = useState(false)

	return (
		<>
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
						<div style={{ display: 'flex', gap: '1rem' }}>
							<input
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
							/>
							<button onClick={() => setShowFilters(true)}>
								Filters
							</button>
							{showFilters && (
								<FiltersModal
									onClose={() => setShowFilters(false)}
								/>
							)}
							<button className="secondary">Rerchercher</button>
						</div>
					</section>

					{data == undefined ? (
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flex: 1,
							}}
						>
							<Ring />
						</div>
					) : (
						<>
							{restaurants && (
								<>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: '1.5rem',
										}}
									>
										<h2 style={{ fontSize: '1.25rem' }}>
											{restaurants.length +
												" restaurants sur 1'047"}
										</h2>
										<div
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
										</div>
									</div>
									<RestaurantList
										key="Restaurants"
										restaurants={restaurants}
										list={{ name: 'Restaurants' }}
										ref={restaurantListRef}
									/>
									{/* <div
										style={{
											position: 'sticky',
											display: 'flex',
											justifyContent: 'center',
											bottom: '1rem',
											padding: '1rem',
											// marginTop: '-2.5rem',
										}}
									>
										<button
											className="secondary"
											style={{
												// border: '2px solid white',
												boxShadow:
													'0 0 32px 4px rgba(255,255,255,0.5)',
											}}
										>
											{t('search:displayMap')}
										</button>
									</div> */}
								</>
							)}
						</>
					)}
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, [
				'common',
				'search',
				'restaurant',
			])),
		},
	}
}
