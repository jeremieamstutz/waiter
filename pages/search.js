import { motion } from 'framer-motion'
import ItemList from 'components/item/item-list'
import Container from 'components/layout/container'
import Header from 'components/layout/header'
import RestaurantList from 'components/restaurant/restaurant-list'
import useDebounce from 'hooks/useDebounce'
import useSessionStorage from 'hooks/useSessionStorage'
import useSWR from 'swr'

import { fadeIn } from 'animations'
import { useRef } from 'react'
import useScrollRestoration from 'hooks/useScrollRestauration'
import { searchItems, searchRestaurants } from './api/search'

export default function SearchPage({ fallbackData }) {
	const initialSearch = {
		query: '',
		cuisine: '',
	}
	const [search, setSearch] = useSessionStorage('search', initialSearch)
	const debouncedSearch = useDebounce(search, 200)

	const cuisines = [
		'Américaine',
		'Asiatique',
		'Espagnole',
		'Française',
		'Italienne',
		'Mexicaine',
		'Portugaise',
		'Suisse',
	]
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

	const {
		data: { restaurants, items },
	} = useSWR(
		debouncedSearch
			? `/api/search?query=${debouncedSearch.query}&cuisine=${debouncedSearch.cuisine}`
			: null,
		{
			fallbackData,
		},
	)

	return (
		<>
			<Container>
				<h1>Recherche</h1>
				<section>
					<input
						type="text"
						placeholder="Ville, restaurant, cuisine ou plat"
						value={search ? search.query : ''}
						onChange={handleInput}
						autoFocus
					/>
					<div
						style={{
							display: 'flex',
							gap: '0.5rem',
							overflow: 'scroll',
							padding: '1rem',
							margin: '0 -1rem',
						}}
						ref={cuisinesRef}
					>
						{cuisines.map((cuisine, index) => (
							<div
								onClick={handleCuisineChange}
								style={{
									padding: '0.5rem 1rem',
									color:
										search?.cuisine === cuisine
											? '#fff'
											: '#000',
									background:
										search?.cuisine === cuisine
											? '#333'
											: '#eee',
									borderRadius: '0.5rem',
									border: '1px solid #ddd',
								}}
								key={index}
							>
								{cuisine}
							</div>
						))}
					</div>
				</section>
				{search && restaurants && (
					<RestaurantList
						key="Restaurants"
						restaurants={restaurants}
						list={{
							name: 'Restaurants',
						}}
						ref={restaurantListRef}
					/>
				)}
				{search && items && (
					<ItemList
						restaurant={undefined}
						category={{ name: 'Nourriture et boissons' }}
						items={items}
						ref={itemListRef}
					/>
				)}
			</Container>
			<Header>
				{(search?.query || search?.cuisine) && (
					<motion.div
						style={{ padding: '1rem' }}
						initial={'initial'}
						animate="animate"
						exit="initial"
						variants={fadeIn}
					>
						<button
							onClick={handleResetSearch}
							style={{
								width: '100%',
								color: 'white',
								background: '#333',
								border: 'none',
								textAlign: 'left',
							}}
						>
							Réinitialiser la recherche
						</button>
					</motion.div>
				)}
			</Header>
		</>
	)
}

export async function getStaticProps() {
	const restaurants = await searchRestaurants({ query: '', cuisine: '' })
	const items = await searchItems({ query: '' })

	return {
		props: {
			fallbackData: {
				restaurants,
				items,
			},
		},
	}
}
