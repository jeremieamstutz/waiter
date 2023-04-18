import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import track from 'utils/track'

import { useRestaurant } from 'contexts/restaurant'
import { useOrder } from 'contexts/order'

import Modal from 'components/ui/modal'

function QuantityPicker({ max, ...props }) {
	return (
		<select
			style={{
				fontFamily: 'Gilroy',
				fontSize: '1.2rem',
				padding: 0,
				width: '2rem',
				color: '#000',
				flexShrink: 0,
				appearance: 'none',
				height: '1.2rem',
				lineHeight: '1.5rem',
				borderRadius: 0,
				cursor: 'pointer',
			}}
			{...props}
		>
			{[...Array(Math.max(10, max)).keys()].map((value) => (
				<option key={value} value={value}>
					{value}
				</option>
			))}
		</select>
	)
}

function CartItem({ item }) {
	const { updateItem } = useOrder()

	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				justifyContent: 'space-between',
				gap: '1rem',
			}}
		>
			<div
				style={{
					display: 'flex',
				}}
			>
				<QuantityPicker
					max={10}
					value={item.quantity}
					onChange={(event) => {
						track.event({
							event_category: 'order',
							event_name: 'update_item',
							event_label: item.name,
						})
						updateItem({
							...item,
							quantity: +event.target.value,
						})
					}}
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.5rem',
					}}
				>
					<h3 style={{ margin: 0 }}>{item.name}</h3>
					{/* <ul
												style={{
													margin: 0,
													padding: 0,
													display: 'flex',
													flexDirection: 'column',
													gap: '0.5rem',
												}}
											>
												<li
													style={{
														display: 'flex',
														fontFamily: 'Rubik',
														fontSize: '1.125rem',
													}}
												>
													• Frites allumettes
												</li>
												<li
													style={{
														display: 'flex',
														fontFamily: 'Rubik',
														fontSize: '1.125rem',
													}}
												>
													• Coca Cola
												</li>
											</ul> */}
				</div>
			</div>
			<span
				style={{
					flexShrink: 0,
					fontFamily: 'Rubik',
					fontSize: '1.2rem',
					textAlign: 'right',
					color: '#a00',
				}}
			>
				{(item.price * item.quantity).toFixed(2)}
			</span>
		</div>
	)
}

function CartTotal() {
	const { order } = useOrder()

	return (
		<div
			style={{
				padding: '1rem 0',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}
		>
			<span
				style={{
					display: 'flex',
				}}
			>
				<span
					style={{
						fontFamily: 'Gilroy',
						fontSize: '1.2rem',
						width: '2rem',
					}}
				>
					{order.items.reduce(
						(total, item) => total + item.quantity,
						0,
					)}
				</span>
				<span
					style={{
						fontFamily: 'Gilroy',
						fontSize: '1.2rem',
					}}
				>
					Items
				</span>
			</span>
			<span
				style={{
					fontFamily: 'Rubik',
					fontSize: '1.2rem',
					color: '#a00',
				}}
			>
				{order.total.toFixed(2)}
			</span>
		</div>
	)
}

export default function CartModal({ onClose }) {
	const { t } = useTranslation()
	const router = useRouter()
	const { restaurant } = useRestaurant()
	const { order, updateItem, resetCart } = useOrder()

	return (
		<Modal
			title="Cart"
			onClose={onClose}
			footer={
				order?.items.length > 0 && (
					<button
						className="secondary"
						style={{ flex: 1 }}
						onClick={() => {
							const { showCart, ...query } = router.query
							router.push({
								pathname: router.pathname,
								query: {
									...query,
									showCheckout: true,
								},
							})
						}}
					>
						Go to checkout
					</button>
				)
			}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					marginBottom: '1rem',
				}}
			>
				<h2>{restaurant.name}</h2>
			</div>
			{order?.items.length > 0 ? (
				<>
					<ul
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '2rem',
							margin: 0,
							padding: '0.5rem 0 1rem',
							borderBottom: '1px solid #ccc',
						}}
					>
						{order?.items.map((item) => (
							<li
								key={item.id}
								style={{
									listStyleType: 'none',
								}}
							>
								<CartItem item={item} />
							</li>
						))}
					</ul>
					<CartTotal />
					{/* <button onClick={resetCart}>Clear cart</button> */}
				</>
			) : (
				<p>Add items from a restaurant</p>
			)}
		</Modal>
	)
}
