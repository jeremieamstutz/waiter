import {
	Elements,
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Modal from 'components/ui/modal'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import sleep from 'utils/sleep'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

function SetupForm() {
	const stripe = useStripe()
	const elements = useElements()
	const router = useRouter()
	const [error, setError] = useState()

	async function handleSubmit(event) {
		event.preventDefault()

		if (!stripe || !elements) {
			return
		}

		const { error } = await stripe.confirmSetup({
			elements,
			redirect: 'if_required',
		})

		if (error) {
			return setError(error.message)
		}

		const { showAddPaymentMethod, ...query } = router.query
		router.push(
			{
				pathname: router.pathname,
				query: { ...query, showCart: true },
			},
			undefined,
			{ shallow: true },
		)
	}

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<button type="submit" disabled={!stripe} className="secondary">
				Submit
			</button>
		</form>
	)
}

export default function AddPaymentMethodModal({ onClose }) {
	const [clientSecret, setClientSecret] = useState()

	useEffect(() => {
		async function fetchSecret() {
			const {
				data: { clientSecret },
			} = await axios({
				method: 'POST',
				url: '/api/payment/methods',
			})
			setClientSecret(clientSecret)
		}
		fetchSecret()
	}, [])

	const options = {
		clientSecret,
	}

	return (
		<Modal title="Add Card" onClose={onClose}>
			{clientSecret ? (
				<Elements stripe={stripePromise} options={options}>
					<SetupForm />
				</Elements>
			) : (
				<div>Loading...</div>
			)}
		</Modal>
	)
}
