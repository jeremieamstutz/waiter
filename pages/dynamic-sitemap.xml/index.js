import { getServerSideSitemap } from 'next-sitemap'
import { getAllItemSlugs } from 'pages/api/items'
import { getAllRestaurantSlugs } from 'pages/api/restaurants'

export const getServerSideProps = async (context) => {
	let fields = []

	const restaurants = await getAllRestaurantSlugs()
	restaurants.forEach((restaurant) =>
		fields.push({
			loc: `${process.env.NEXTAUTH_URL}/${restaurant.restaurantSlug}`,
			changefreq: 'daily',
			priority: 0.7,
			lastmod: new Date().toISOString(),
		}),
	)
	
	// TODO: Add categories

	const items = await getAllItemSlugs()
	items.forEach((item) =>
		fields.push({
			loc: `${process.env.NEXTAUTH_URL}/${item.restaurantSlug}/${item.categorySlug}/${item.itemSlug}`,
			changefreq: 'daily',
			priority: 0.7,
			lastmod: new Date().toISOString(),
		}),
	)

	return getServerSideSitemap(context, fields)
}

const SiteMap = () => {}

export default SiteMap
