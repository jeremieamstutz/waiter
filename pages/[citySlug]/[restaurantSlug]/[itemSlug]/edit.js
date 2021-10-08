import ItemForm from 'components/item/item-form'
import { 
	getItem, 
	// getItemsSlugs 
} from 'utils/db'

import classes from 'styles/edit-item.module.css'

export default function EditItemPage({ item }) {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>Edit item</h1>
			<ItemForm item={item} />
		</div>
	)
}

export async function getServerSideProps({ params }) {
	const { itemSlug, restaurantSlug, citySlug } = params
	const item = await getItem({ itemSlug, restaurantSlug, citySlug })

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
