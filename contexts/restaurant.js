import { createContext, useContext, useState } from 'react'

export const RestaurantContext = createContext({
	restaurant: undefined,
	setRestaurant: () => {},
})

export const RestaurantProvider = ({ initialValue, children }) => {
	const [restaurant, setRestaurant] = useState(initialValue)

	const restaurantContext = { restaurant, setRestaurant }

	return (
		<RestaurantContext.Provider value={restaurantContext}>
			{children}
		</RestaurantContext.Provider>
	)
}

export const useRestaurant = () => {
	return useContext(RestaurantContext)
}
