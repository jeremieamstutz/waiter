import Header from 'components/layout/header'
import RestaurantCard from 'components/restaurant/restaurant-card'
import useSWR from 'swr'

export default function FavoritesPage() {
	const { data, error } = useSWR('/api/favorites')

	return (
		<>
			<div className="container">
				<h1>Favorites</h1>

				{!error && !data ? (
					<p>loading...</p>
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
