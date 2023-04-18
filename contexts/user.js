import useSWR from 'swr'
import track from 'utils/track'

export default function useUser() {
	const { data: user } = useSWR('/api/me')

	user && track.config({ user_id: user.id })

	return user
}
