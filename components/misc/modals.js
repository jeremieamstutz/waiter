import EditWishlistModal from 'components/wishlist/edit-wishlist-modal'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const WishlistsModal = dynamic(() =>
	import('components/wishlist/wishlists-modal'),
)
const FlagsModal = dynamic(() => import('components/flag/flags-modal'))
const FeedbackModal = dynamic(() => import('components/misc/feedback-modal'))

export default function Modals() {
	const router = useRouter()
	return (
		<>
			{router.query.showFeedback && (
				<FeedbackModal onClose={() => router.back()} />
			)}
			{router.query.showWishlists && (
				<WishlistsModal onClose={() => router.back()} />
			)}
			{router.query.showEditWishlist && (
				<EditWishlistModal onClose={() => router.back()} />
			)}
			{router.query.showFlags && (
				<FlagsModal onClose={() => router.back()} />
			)}
		</>
	)
}
