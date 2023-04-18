import { createContext, useContext } from 'react'
import useSWR from 'swr'

export const RestaurantContext = createContext({
	restaurant: {},
})

export const RestaurantProvider = ({ initialValue, children }) => {
	const { data: restaurant } = useSWR(
		initialValue ? `/api/restaurants/${initialValue.id}` : null,
		{
			fallbackData: initialValue || {},
		},
	)

	return (
		<RestaurantContext.Provider value={{ restaurant }}>
			{children}
		</RestaurantContext.Provider>
	)
}

export const useRestaurant = () => {
	return useContext(RestaurantContext)
}
