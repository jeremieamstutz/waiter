import { createContext, useReducer, useContext, useEffect } from 'react'
import { useRestaurant } from './restaurant'

export const OrderContext = createContext({
	items: [],
	total: 0,
	resetCart: () => {},
	setOrder: (order) => {},
	addItem: (item) => {},
	updateItem: (item) => {},
	removeItem: (item) => {},
})

const defaultOrderState = {
	restaurantId: '',
	items: [],
	total: 0,
	remark: '',
	status: '',
	payment: {
		method: '',
	},
}

const orderReducer = (state, action) => {
	let orders = [...state]
	let orderIndex = orders.findIndex(
		(order) => order.restaurantId === action.restaurantId,
	)

	let order = state[orderIndex] || {
		...defaultOrderState,
		restaurantId: action.restaurantId,
	}

	let restaurantId = order.restaurantId
	let items = [...order.items]
	let total = order.total

	if (action.type === 'GENERAL') {
		if (action.method === 'RESET') {
			items = []
			total = 0
		}

		if (action.method === 'SET') {
			return action.order
		}
	}

	if (action.type === 'ITEM') {
		const itemIndex = order.items.findIndex(
			(item) => item.id === action.item.id,
		)
		const existingItem = order.items[itemIndex]

		if (action.method === 'ADD') {
			if (existingItem) {
				items[itemIndex] = {
					...existingItem,
					quantity:
						existingItem.quantity + (action.item.quantity || 1),
				}
			} else {
				items = [
					...items,
					{ ...action.item, quantity: action.item.quantity || 1 },
				]
			}
			restaurantId = action.item.restaurantId
		}

		if (action.method === 'UPDATE') {
			if (existingItem) {
				if (action.item.quantity > 0) {
					items[itemIndex] = action.item
				} else {
					items = items.filter((item) => item.id !== action.item.id)
				}
			} else {
				items = [...items, { ...action.item }]
			}
		}

		if (action.method === 'REMOVE') {
			if (existingItem) {
				if (existingItem.quantity >= 2) {
					items[itemIndex] = {
						...existingItem,
						quantity:
							existingItem.quantity - (action.item.quantity || 1),
					}
				} else {
					items = items.filter((item) => item.id !== action.item.id)
				}
			}
		}
	}

	total = items.reduce((total, item) => total + item.price * item.quantity, 0)

	order = { ...order, restaurantId, items, total }

	if (orderIndex > -1) {
		orders[orderIndex] = order
	} else {
		orders = [...orders, order]
	}

	return orders
}

export const OrderProvider = ({ children }) => {
	const { restaurant } = useRestaurant()
	const [ordersState, dispatchOrderAction] = useReducer(orderReducer, [])

	useEffect(() => {
		const localData = localStorage.getItem('orders')
		dispatchOrderAction({
			type: 'GENERAL',
			method: 'SET',
			order: localData ? JSON.parse(localData) : [],
		})
	}, [])

	useEffect(() => {
		if (ordersState.length > 0) {
			localStorage.setItem('orders', JSON.stringify(ordersState))
		}
	}, [ordersState])

	async function handleSendOrder() {
		const order = {
			items: ordersState.items.map((item) => ({
				id: item.id,
				quantity: item.quantity,
			})),
		}

		const response = await fetch('/api/orders', {
			method: 'POST',
			body: JSON.stringify(order),
			headers: {
				'Content-type': 'application/json',
			},
		})

		const data = await response.json()
		if (data.success) {
			dispatchOrderAction({ type: 'GENERAL', method: 'RESET' })
		}
		return data
	}

	const order =
		restaurant &&
		ordersState.filter((order) => order.restaurantId === restaurant.id)[0]

	const orderContext = {
		order,
		ordersState,
		setOrders: (orders) =>
			dispatchOrderAction({
				type: 'GENERAL',
				method: 'SET',
				orders,
			}),
		resetCart: () =>
			dispatchOrderAction({
				type: 'GENERAL',
				method: 'RESET',
				restaurantId: restaurant.id,
			}),
		addItem: (item) =>
			dispatchOrderAction({
				type: 'ITEM',
				method: 'ADD',
				item,
				restaurantId: restaurant.id,
			}),
		updateItem: (item) =>
			dispatchOrderAction({
				type: 'ITEM',
				method: 'UPDATE',
				item,
				restaurantId: restaurant.id,
			}),
		removeItem: (item) =>
			dispatchOrderAction({
				type: 'ITEM',
				method: 'REMOVE',
				item,
				restaurantId: restaurant.id,
			}),
		sendOrder: handleSendOrder,
	}

	return (
		<OrderContext.Provider value={orderContext}>
			{children}
		</OrderContext.Provider>
	)
}

export function useOrder() {
	return useContext(OrderContext)
}
