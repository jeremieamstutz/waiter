import CategoryForm from 'components/category/category-form'

import { getCategory } from 'pages/api/categories/[categoryId]'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'

import classes from 'styles/new-category.module.css'

export default function EditCategoryPage({ category, restaurant }) {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>Edit category</h1>
			<CategoryForm category={category} restaurant={restaurant} />
		</div>
	)
}

export async function getServerSideProps({ params }) {
	const { restaurantSlug, categorySlug } = params
	const category = await getCategory({ restaurantSlug, categorySlug })
	const restaurant = await getRestaurant({ restaurantSlug })

	if (!category) {
		return {
			notFound: true,
		}
	}

	return { props: { category, restaurant } }
}
