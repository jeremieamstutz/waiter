import useSWR from 'swr'

import RestaurantCard from 'components/restaurant/restaurant-card'
import { Ring } from 'components/ui/spinner'
import Header from 'components/layout/header'

export default function FavoritesPage() {
	const { data, error } = useSWR('/api/favorites')

	return (
		<>
			<div className="container">
				<h1>Favorites</h1>
				{!error && !data ? (
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
				) : data.restaurants.length > 0 ? (
					<RestaurantCard restaurant={data.restaurants[0]} />
				) : (
					<p>No favorite restaurant yet</p>
				)}
			</div>
			<Header />
		</>
	)
}
