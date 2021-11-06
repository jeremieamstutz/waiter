import Container from 'components/layout/container'
import RestaurantForm from 'components/restaurant/restaurant-form'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'

export default function EditRestaurantPage({ restaurant }) {
	return (
		<Container>
			<h1>Edit restaurant</h1>
			<RestaurantForm restaurant={restaurant} />
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
		fallback: 'blocking',
	}
}
