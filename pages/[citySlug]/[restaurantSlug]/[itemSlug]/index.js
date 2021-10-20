import ItemDetail from 'components/item/item-detail'
import { getItem, getItemsSlugs } from 'utils/db'

export default function ItemDetailPage({ item }) {
	return <ItemDetail item={item} />
}

export async function getStaticProps({ params }) {
	const { itemSlug, restaurantSlug, citySlug } = params
	const item = await getItem({ itemSlug, restaurantSlug, citySlug })

	if (!item) {
		return {
			notFound: true,
		}
	}

	return { props: { item }, revalidate: 5 }
}

export async function getStaticPaths() {
	const itemsSlugs = await getItemsSlugs()

	return {
		paths: itemsSlugs.map((item) => ({
			params: item,
		})),
		fallback: 'blocking',
	}
}
