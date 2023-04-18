import { Restaurant } from 'db/models'

export default async function sitemap() {
	const restaurants = await Restaurant.findAll()

	const restaurants_routes = restaurants.map((restaurant) => ({
		url: `${process.env.NEXTAUTH_URL}/restaurants/${restaurant.slug}`,
		lastModified: new Date().toISOString(),
	}))

	const base_routes = ['/', '/about', '/contact', '/faq', '/help', '/login']

	return [...base_routes, ...restaurants_routes]
}
