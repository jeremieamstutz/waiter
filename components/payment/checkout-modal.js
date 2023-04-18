import Modal from 'components/ui/modal'
import axios from 'axios'
import useSWR from 'swr'
import VisaIcon from 'components/icons/visa'
import { Form, Formik } from 'formik'
import { useOrder } from 'contexts/order'
import { array, object } from 'yup'
// ;<Textarea
// 	name="remark"
// 	label="Remark"
// 	placeholder="Eg. 'we don't have a lot of time' or 'could you bring two forks please ?'"
// />
// {
// 	paymentMethod && (
// 		<>
// 			<h2>Payment method</h2>
// 			<div
// 				style={{
// 					display: 'flex',
// 					justifyContent: 'space-between',
// 				}}
// 			>
// 				<div
// 					style={{
// 						display: 'flex',
// 						alignItems: 'center',
// 						gap: '1rem',
// 					}}
// 				>
// 					<VisaIcon />
// 					<span
// 						style={{
// 							fontSize: '1.125rem',
// 							fontFamily: 'Rubik',
// 						}}
// 					>
// 						•••• •••• •••• {paymentMethod.card.last4}
// 					</span>
// 				</div>
// 				<button
// 					type="button"
// 					onClick={() => {
// 						const { showOrder, ...query } = router.query
// 						router.push(
// 							{
// 								pathname: router.pathname,
// 								query: {
// 									...query,
// 									showPaymentMethods: true,
// 								},
// 							},
// 							undefined,
// 							{ shallow: true },
// 						)
// 					}}
// 				>
// 					Edit
// 				</button>
// 			</div>
// 		</>
// 	)
// }

export default function CheckoutModal({ onClose }) {
	const { order, updateItem } = useOrder()
	const { data: paymentMethods } = useSWR('/api/payment/methods')
	const paymentMethod = paymentMethods?.[0]
	return (
		<Modal title="Checkout" onClose={onClose}>
			<Formik
				initialValues={{ items: order.items }}
				validationSchema={object({
					items: array(object()).min(1),
				})}
				onSubmit={async (event) => {
					console.log('ORDER SENT')

					if (!paymentMethod) {
						const { showCart, ...query } = router.query
						router.push(
							{
								pathname: router.pathname,
								query: {
									...query,
									showPaymentMethods: true,
								},
							},
							undefined,
							{ shallow: true },
						)
					}

					await axios({
						method: 'POST',
						url: '/api/orders',
						data: order,
					})

					const { showOrder, ...query } = router.query
					router.push(
						{
							pathname: router.pathname,
							query,
						},
						undefined,
						{ shallow: true },
					)
				}}
			>
				<Form></Form>
			</Formik>
		</Modal>
	)
}
