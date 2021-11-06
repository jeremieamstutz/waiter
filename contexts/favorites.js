import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export default function useFavorites() {
	const { status } = useSession()

	return useSWR(status === 'authenticated' ? `/api/favorites` : null, {
		fallbackData: { restaurantIds: [] },
	})
}
