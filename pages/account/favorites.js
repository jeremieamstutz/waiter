import useSWR from 'swr'

import RestaurantCard from 'components/restaurant/restaurant-card'
import { Ring } from 'components/ui/spinner'
import Header from 'components/layout/header'
import Container from 'components/layout/container'
import RestaurantList from 'components/restaurant/restaurant-list'
import { groupBy } from 'utils/processing'
import axios from 'axios'

export default function FavoritesPage() {
	const {
		data: { restaurants },
		error,
	} = useSWR('/api/restaurants/favorites', {
		fallbackData: {
			restaurants: undefined,
		},
	})

	return (
		<>
			<Container>
				<h1>Favoris</h1>

				{!error && !restaurants ? (
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
					[
						...groupBy(
							restaurants,
							(restaurant) => restaurant.city,
						),
					].map(([key, value]) => (
						<RestaurantList
							key={key}
							restaurants={value}
							list={{
								name: key,
							}}
						/>
					))
				) : (
					<p>No favorite restaurant yet</p>
				)}
			</Container>
			<Header />
		</>
	)
}
