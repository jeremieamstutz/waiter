import { getServerSideSitemap } from 'next-sitemap'

import { getAllRestaurantSlugs } from 'pages/api/restaurants'

export const getServerSideProps = async (context) => {
	let fields = []

	const restaurants = await getAllRestaurantSlugs()
	restaurants.forEach((restaurant) =>
		fields.push({
			loc: `${process.env.NEXTAUTH_URL}/restaurants/${restaurant.restaurantSlug}`,
			changefreq: 'daily',
			priority: 0.7,
			lastmod: new Date().toISOString(),
		}),
	)

	return getServerSideSitemap(context, fields)
}

const SiteMap = () => {}

export default SiteMap
