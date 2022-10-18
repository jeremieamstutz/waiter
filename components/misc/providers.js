import { RestaurantProvider } from 'contexts/restaurant'
import { FlagsProvider } from 'contexts/flags'
import { OrderProvider } from 'contexts/order'

// TODO: Remove restaurant provider from here
export default function Providers({ restaurant, flags, children }) {
	return (
		<FlagsProvider initialValue={flags}>
			<RestaurantProvider initialValue={restaurant}>
				<OrderProvider>{children}</OrderProvider>
			</RestaurantProvider>
		</FlagsProvider>
	)
}
