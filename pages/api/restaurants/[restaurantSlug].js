import { getSession } from 'next-auth/client'
import statusCodes from 'utils/statusCodes'

export function getRestaurant(id) {
	return {
		id: '292hs82hw',
		slug: 'holycow',
		name: 'Holy Cow!',
		description:
			'A fresh gourmet burger, served only with local and tasty products, all in less than 10 minutes.',
		images: [
			'https://www.flughafen-zuerich.ch/-/jssmedia/airport/portal/bilder/shopfinder/bilder/gastro/oeffentlicher-bereich/check-in-2/small_1_holy_cow_x0a0922tc.jpg?vs=1&mw=1920',
		],
		location: {
			address: 'EPFL',
			city: 'Ecublens',
			postalCode: '1010',
			region: 'Vaud',
			country: 'CH',
			latitude: 40.9333,
			longitude: 7.0,
		},
		hours: [
			{
				day: 1,
				periods: [
					{
						start: 8,
						end: 12,
					},
				],
			},
		],
		rating: {
			value: 4.9,
			count: 232,
		},
		priceBucket: '$',
		isOpen: true,
		allowBooking: true,
		categories: [
			{
				id: 1,
				slug: 'beef-burgers',
				name: 'Beef Burgers',
				description: '160g of 100% Swiss Beef',
			},
			{
				id: 2,
				slug: 'chicken-burgers',
				name: 'Chicken Burgers',
				description: '160g of 100% Swiss Chicken',
			},
		],
		items: [
			{
				id: 1,
				slug: 'big-beef',
				category: { id: 1, name: 'Beef Burgers' },
				name: 'Big Beef',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_BigBeef_550x440.jpg',
			},
			{
				id: 2,
				slug: 'big-cheese',
				category: { id: 1, name: 'Beef Burgers' },
				name: 'Big Cheese',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_BigCheese_550x440.jpg',
			},
			{
				id: 3,
				slug: 'smokey-big-cheese-and-bacon',
				category: { id: 1, name: 'Beef Burgers' },
				name: 'Smokey Big Cheese and Bacon',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_SmokinHolyCowboy_550x440.jpg',
			},
			{
				id: 4,
				slug: 'bacon-avocado-beef',
				category: { id: 1, name: 'Beef Burgers' },
				name: 'Bacon Avocado Beef',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_BaconAvocadoBeef_550x440.jpg',
			},
			{
				id: 5,
				slug: 'elvis-blue-cheese',
				category: { id: 1, name: 'Beef Burgers' },
				name: 'Elvis Blue Cheese',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_ElvisBlueCheese_550x440.jpg',
			},
			{
				id: 6,
				slug: 'viva-espana',
				category: { id: 1, name: 'Beef Burgers' },
				name: 'Viva Espana',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_VivaEspana_550x440.jpg',
			},
			{
				id: 7,
				slug: 'maui-maui',
				category: { id: 1, name: 'Beef Burgers' },
				name: 'Maui Maui',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerBoeuf_MauiMaui_550x440.jpg',
			},
			{
				id: 8,
				slug: 'the-chicken',
				category: { id: 2, name: 'Chicken Burgers' },
				name: 'The Chicken',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerPoulet_TheChicken_550x440.jpg',
			},
			{
				id: 9,
				slug: 'bbq-chick-n-cheese',
				category: { id: 2, name: 'Chicken Burgers' },
				name: "BBQ Chick'N'Cheese",
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerPoulet_BBQChickenCheese_550x440.jpg',
			},
			{
				id: 10,
				slug: 'bacon-avocado-chicken',
				category: { id: 2, name: 'Chicken Burgers' },
				name: 'Bacon Avocado Chicken',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerPoulet_BaconAvocadoChicken_550x440.jpg',
			},
			{
				id: 11,
				slug: 'camenbert-cranberry',
				category: { id: 2, name: 'Chicken Burgers' },
				name: 'Camenbert Cranberry',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerPoulet_CamembertCranberry_550x440.jpg',
			},
			{
				id: 12,
				slug: 'satay-chicken',
				category: { id: 2, name: 'Chicken Burgers' },
				name: 'Satay Chicken',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerPoulet_SatayChicken_550x440.jpg',
			},
			{
				id: 13,
				slug: 'funny-chicken',
				category: { id: 2, name: 'Chicken Burgers' },
				name: 'Funny Chicken',
				description:
					'Swiss beef, ketchup, caramelized onions, batavia salad',
				price: 12.9,
				image: 'https://www.holycow.ch/wp-content/uploads/2020/12/HolyCoW_BurgerPoulet_FunkyChicken_550x440.jpg',
			},
		],
	}
}

export default async function handler(req, res) {
	const {
		query: { restaurantId },
		method,
	} = req

	const session = await getSession({ req })

	console.log(session)

	switch (method) {
		case 'GET':
			res.status(statusCodes.ok).json(getRestaurant(restaurantId))
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
