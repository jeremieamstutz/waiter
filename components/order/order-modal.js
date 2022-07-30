import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { useOrder } from 'contexts/order'

import Modal from 'components/ui/modal'
import Input from 'components/form/input'
import Textarea from 'components/form/textarea'
import { Form, Formik } from 'formik'

export default function OrderModal({ onClose }) {
	const { t } = useTranslation()
	const router = useRouter()
	const orderContext = useOrder()

	return (
		<Modal
			title="Current order"
			onClose={onClose}
			footer={
				<>
					<div
						style={{
							height: '2.5rem',
							minWidth: '4rem',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#fff',
							background: '#aaa',
							borderRadius: '0.5rem',
							gap: '0.25rem',
							display: 'flex',
							alignItems: 'center',
							margin: '0 0.35rem 0.35rem 0',
						}}
						// className={classes.payment}
					>
						<div
							style={{
								background: '#1a1f71',
								// background: '#00D76E',
								color: 'white',
								fontSize: '1.125rem',
								borderRadius: '0.5rem',
								padding: '0.5rem 1.25rem',
								display: 'flex',
								alignItems: 'center',
								height: '2.5rem',
								margin: '0.35rem -0.35rem -0.35rem 0.35rem',
								userSelect: 'none',
							}}
						>
							Visa
						</div>
						{/* <svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="white"
						>
							<path
								fillRule="evenodd"
								d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg> */}
					</div>
					<button className="secondary" style={{ flex: 1 }}>
						Pay now
					</button>
				</>
			}
		>
			<Formik>
				<Form>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<div style={{ fontSize: '1.25rem', flexShrink: 0 }}>
							Café du commerce
						</div>
						<select
							label="Table"
							name="table"
							style={{ flex: 0, minWidth: '10rem' }}
						>
							<option value={1}>Table 1</option>
							<option value={2}>Table 2</option>
							<option value={3}>Table 3</option>
						</select>
					</div>
					<ul
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
							padding: 0,
						}}
					>
						{orderContext.items.map((item) => (
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
									<select
										value={item.quantity}
										onChange={(event) =>
											orderContext.updateItem({
												...item,
												quantity: +event.target.value,
											})
										}
										style={{ flex: 0 }}
									>
										{[
											...Array(
												Math.max(10, item.quantity),
											).keys(),
										].map((value) => (
											<option key={value} value={value}>
												{value}
											</option>
										))}
									</select>
									<div
										onClick={() =>
											router.push(
												{
													pathname: router.pathname,
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
									CHF{' '}
									{(item.price * item.quantity).toFixed(2)}
								</span>
							</li>
						))}
						<li
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									cursor: 'pointer',
									fontFamily: 'Rubik',
									fontSize: '1.125rem',
								}}
							>
								Tip
							</span>
							<div
								style={{
									display: 'flex',
									gap: '0.5rem',
									flex: 1,
									marginLeft: '1rem',
								}}
							>
								<div
									style={{
										background: '#eee',
										borderRadius: '1.5rem',
										padding: '0.5rem 1rem',
									}}
								>
									5%
								</div>
								<div
									style={{
										background: '#eee',
										borderRadius: '1.5rem',
										padding: '0.5rem 1rem',
									}}
								>
									10%
								</div>
								<div
									style={{
										background: '#eee',
										borderRadius: '1.5rem',
										padding: '0.5rem 1rem',
									}}
								>
									15%
								</div>
							</div>
							<span
								style={{
									fontFamily: 'Rubik',
									fontSize: '1.125rem',
								}}
							>
								CHF 10
							</span>
						</li>
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
							CHF {orderContext.total.toFixed(2)}
						</span>
					</div>
					<Textarea
						name="remark"
						label="Remark"
						placeholder="Eg. 'we don't have a lot of time' or 'could you bring two forks please ?'"
					/>
				</Form>
			</Formik>
		</Modal>
	)
}
