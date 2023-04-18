import EditWishlistModal from 'components/wishlist/edit-wishlist-modal'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const WishlistsModal = dynamic(() =>
	import('components/wishlist/wishlists-modal'),
)
const FlagsModal = dynamic(() => import('components/flag/flags-modal'))
const FeedbackModal = dynamic(() => import('components/misc/feedback-modal'))
const PaymentMethodsModal = dynamic(() =>
	import('components/payment/payment-methods-modal'),
)
const AddCardModal = dynamic(() => import('components/payment/add-card-modal'))

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
			{router.query.showPaymentMethods && (
				<PaymentMethodsModal onClose={() => router.back()} />
			)}
			{router.query.showAddPaymentMethod && (
				<AddCardModal onClose={() => router.back()} />
			)}
		</>
	)
}
