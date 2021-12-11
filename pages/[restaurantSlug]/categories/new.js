import CategoryForm from 'components/category/category-form'
import { getAllRestaurants } from 'pages/api/restaurants'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'

import classes from 'styles/new-category.module.css'

export default function NewCategoryPage({ restaurant }) {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>New category</h1>
			<CategoryForm restaurant={restaurant} />
		</div>
	)
}

export async function getStaticPaths() {
	const restaurants = await getAllRestaurants()

	return {
		// paths: restaurants.map((restaurant) => ({
		// 	params: { restaurantSlug: restaurant.id },
		// })),
		paths: [],
		fallback: 'blocking',
	}
}

export async function getStaticProps({ params }) {
	const { restaurantSlug } = params
	const restaurant = await getRestaurant({ restaurantSlug })

	if (!restaurant) {
		return {
			notFound: true,
		}
	}

	return { props: { restaurant } }
}
