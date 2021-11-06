import RestaurantCard from 'components/restaurant/restaurant-card'

import classes from './restaurant-list.module.css'

export default function RestaurantList({ list, restaurants }) {

	return (
		<section className={classes.container}>
			<div className={classes.header}>
				<h2 className={classes.name}>{list.name}</h2>
				{list.description && (
					<p className={classes.description}>{list.description}</p>
				)}
			</div>
			<div className={classes.list}>
				{restaurants.map((restaurant, index) => (
					<RestaurantCard restaurant={restaurant} key={index} />
				))}
			</div>
		</section>
	)
}
