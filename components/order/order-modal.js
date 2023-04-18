import { useId } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Form, Formik } from 'formik'
import { array, object } from 'yup'

import track from 'utils/track'

import { useRestaurant } from 'contexts/restaurant'
import { useOrder } from 'contexts/order'

import Modal from 'components/ui/modal'
import Textarea from 'components/form/textarea'
import Select from 'components/form/select'
import axios from 'axios'
import useSWR from 'swr'
import VisaIcon from 'components/icons/visa'

export default function OrderModal({ onClose }) {
	const { t } = useTranslation()
	const router = useRouter()
	const { restaurant } = useRestaurant()
	const { order, updateItem } = useOrder()

	const { data: paymentMethods } = useSWR('/api/payment/methods')
	const paymentMethod = paymentMethods?.[0]

	const formId = useId()
	return (
		<Formik
			initialValues={{ items: order.items }}
			validationSchema={object({
				items: array(object()).min(1),
			})}
			onSubmit={async (event) => {
				console.log('ORDER SENT')

				if (!paymentMethod) {
					const { showOrder, ...query } = router.query
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
			{({ setFieldValue }) => (
				<Modal
					title="Current order"
					onClose={onClose}
					footer={
						<button
							type="submit"
							form={formId}
							className="secondary"
							style={{ flex: 1 }}
						>
							Pay now
						</button>
					}
				>
					<Form id={formId}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<div style={{ fontSize: '1.25rem', flexShrink: 0 }}>
								{restaurant.name}
							</div>
							{/* <Select
								name="table"
								style={{ flex: 0, minWidth: '10rem' }}
							>
								<option value={1}>Table 1</option>
								<option value={2}>Table 2</option>
								<option value={3}>Table 3</option>
							</Select> */}
						</div>

						{order.items.length > 0 ? (
							<>
								<ul
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '1rem',
										padding: 0,
									}}
								>
									{order.items.map((item, index) => (
										<li
											key={item.id}
											style={{
												display: 'flex',
												alignItems: 'center',
											}}
										>
											<span
												style={{
													display: 'flex',
													flex: 1,
													alignItems: 'center',
													gap: '1rem',
												}}
											>
												<Select
													name={
														'items[' +
														index +
														'].quantity'
													}
													value={item.quantity}
													onChange={(event) => {
														setFieldValue(
															'items[' +
																index +
																'].quantity',
															+event.target.value,
														)
														track.event({
															event_category:
																'order',
															event_name:
																'update_item',
															event_label:
																item.name,
														})
														updateItem({
															...item,
															quantity:
																+event.target
																	.value,
														})
													}}
													style={{ maxWidth: '5rem' }}
												>
													{[
														...Array(
															Math.max(
																10,
																item.quantity,
															),
														).keys(),
													].map((value) => (
														<option
															key={value}
															value={value}
														>
															{value}
														</option>
													))}
												</Select>
												<div
													onClick={() =>
														router.push(
															{
																pathname:
																	router.pathname,
																query: {
																	...router.query,
																	item: item.id,
																},
															},
															undefined,
														)
													}
													style={{
														cursor: 'pointer',
														fontFamily: 'Rubik',
														fontSize: '1.125rem',
														flex: 1,
													}}
												>
													{item.name}
												</div>
											</span>
											<span
												style={{
													fontFamily: 'Rubik',
													fontSize: '1.125rem',
												}}
											>
												{(
													item.price * item.quantity
												).toFixed(2)}
											</span>
										</li>
									))}
								</ul>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										borderTop: '1px dashed #ccc',
										padding: '1rem 0',
									}}
								>
									<span
										style={{
											fontSize: '1.125rem',
										}}
									>
										Total
									</span>
									<span
										style={{
											fontFamily: 'Rubik',
											fontSize: '1.125rem',
										}}
									>
										{order.total.toFixed(2)}
									</span>
								</div>
								<Textarea
									name="remark"
									label="Remark"
									placeholder="Eg. 'we don't have a lot of time' or 'could you bring two forks please ?'"
								/>
								{paymentMethod && (
									<>
										<h2>Payment method</h2>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
											}}
										>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '1rem',
												}}
											>
												<VisaIcon />
												<span
													style={{
														fontSize: '1.125rem',
														fontFamily: 'Rubik',
													}}
												>
													•••• •••• ••••{' '}
													{paymentMethod.card.last4}
												</span>
											</div>
											<button
												type="button"
												onClick={() => {
													const {
														showOrder,
														...query
													} = router.query
													router.push(
														{
															pathname:
																router.pathname,
															query: {
																...query,
																showPaymentMethods: true,
															},
														},
														undefined,
														{ shallow: true },
													)
												}}
											>
												Edit
											</button>
										</div>
									</>
								)}
							</>
						) : (
							<div>Add items from a restaurant</div>
						)}
					</Form>
				</Modal>
			)}
		</Formik>
	)
}
