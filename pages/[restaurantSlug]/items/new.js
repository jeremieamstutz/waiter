import ItemForm from 'components/item/item-form'
import Container from 'components/layout/container'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'

export default function NewRestaurant({ restaurant }) {
	return (
		<Container>
			<h1>New item</h1>
			<ItemForm restaurant={restaurant} />
		</Container>
	)
}

export async function getStaticProps({ params }) {
	const { restaurantSlug } = params
	const restaurant = await getRestaurant({ restaurantSlug })
	return {
		props: {
			restaurant
		}
	}
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking'
	}
}
