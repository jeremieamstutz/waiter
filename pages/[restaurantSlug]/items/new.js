import ItemForm from 'components/item/item-form'
import Container from 'components/layout/container'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'

export default function NewRestaurant({ restaurantId }) {
	return (
		<Container>
			<h1>New item</h1>
			<ItemForm restaurantId={restaurantId} />
		</Container>
	)
}

export async function getStaticProps({ params }) {
	const { restaurantSlug } = params
	const restaurant = await getRestaurant({ restaurantSlug })
	return {
		props: {
			restaurantId: restaurant.id
		}
	}
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking'
	}
}
