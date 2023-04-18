import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import RadioGroup from 'components/form/radio'
import TrashIcon from 'components/icons/trash'
import VisaIcon from 'components/icons/visa'
import Modal from 'components/ui/modal'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR, { mutate } from 'swr'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

export default function PaymentMethodsModal({ onClose }) {
	const router = useRouter()

	const { data: paymentMethods } = useSWR('/api/payment/methods')

	const BRANDS = {
		visa: <VisaIcon />,
	}

	return (
		<Modal
			title="Payment methods"
			onClose={onClose}
			footer={
				paymentMethods.length > 0 && (
					<button
						className="secondary"
						style={{ flex: 1 }}
						form="select-payment-method"
					>
						Save
					</button>
				)
			}
		>
			<Formik
				initialValues={{ method: '' }}
				onSubmit={async (values) => {
					const { showPaymentMethods, ...query } = router.query
					router.push(
						{
							pathname: router.pathname,
							query: { ...query, showCheckout: true },
						},
						undefined,
						{ shallow: true },
					)
				}}
			>
				<Form id="select-payment-method">
					{paymentMethods.length > 0 && (
						<RadioGroup name="method">
							{paymentMethods?.map((paymentMethod) => (
								<div
									key={paymentMethod.id}
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<RadioGroup.Item value={paymentMethod.id}>
										<div
											style={{
												flex: 1,
												display: 'flex',
												alignItems: 'center',
												gap: '1rem',
											}}
										>
											{BRANDS[paymentMethod.card.brand]}
											<span>
												•••• •••• ••••{' '}
												{paymentMethod.card.last4}
											</span>
											{/* <span>
											{paymentMethod.card.exp_month}/
											{paymentMethod.card.exp_year}
										</span> */}
										</div>
									</RadioGroup.Item>
									<button
										type="button"
										style={{
											minWidth: 0,
											padding: 0,
											width: '3rem',
											borderRadius: '50%',
										}}
										onClick={async () => {
											await axios({
												method: 'DELETE',
												url: `/api/payment/methods/${paymentMethod.id}`,
											})
											await mutate('/api/payment/methods')
										}}
									>
										<TrashIcon />
									</button>
								</div>
							))}
						</RadioGroup>
					)}
					<button
						type="button"
						onClick={() => {
							const { showPaymentMethods, ...query } =
								router.query
							router.push(
								{
									pathname: router.pathname,
									query: {
										...query,
										showAddPaymentMethod: true,
									},
								},
								undefined,
								{ shallow: true },
							)
						}}
					>
						Add new card
					</button>
				</Form>
			</Formik>
		</Modal>
	)
}
