import Container from 'components/layout/container'
import ItemForm from 'components/item/item-form'

import { getItem } from 'pages/api/items/[itemId]'

export default function EditItemPage({ item }) {
	return (
		<Container>
			<h1>Edit item</h1>
			<ItemForm item={item} />
		</Container>
	)
}

export async function getServerSideProps({ params }) {
	const { itemSlug, restaurantSlug } = params
	const item = await getItem({ itemSlug, restaurantSlug })

	if (!item) {
		return {
			notFound: true,
		}
	}

	return { props: { item } }
}

// export async function getStaticPaths() {
// 	const itemsSlugs = await getItemsSlugs()

// 	return {
// 		paths: itemsSlugs.map((item) => ({
// 			params: item,
// 		})),
// 		fallback: 'blocking',
// 	}
// }
