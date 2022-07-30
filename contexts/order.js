import { createContext, useReducer, useContext, useEffect } from 'react'

export const OrderContext = createContext({
	items: [],
	total: 0,
	setOrder: (order) => {},
	addItem: (item) => {},
	updateItem: (item) => {},
	removeItem: (item) => {},
})

const defaultOrderState = {
	items: [],
	total: 0,
}

const orderReducer = (state, action) => {
	let items = [...state.items]
	let total = state.total

	if (action.type === 'GENERAL') {
		if (action.method === 'RESET') {
			return defaultOrderState
		}

		if (action.method === 'SET') {
			return action.order
		}
	}

	if (action.type === 'ITEM') {
		const itemIndex = state.items.findIndex(
			(item) => item.id === action.item.id,
		)
		const existingItem = state.items[itemIndex]

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

	return { ...state, items, total }
}

export const OrderProvider = ({ children }) => {
	const [orderState, dispatchOrderAction] = useReducer(
		orderReducer,
		defaultOrderState,
	)

	useEffect(() => {
		const localData = localStorage.getItem('order')
		dispatchOrderAction({
			type: 'GENERAL',
			method: 'SET',
			order: localData ? JSON.parse(localData) : defaultOrderState,
		})
	}, [])

	useEffect(() => {
		if (orderState !== defaultOrderState) {
			localStorage.setItem('order', JSON.stringify(orderState))
		}
	}, [orderState])

	async function handleSendOrder() {
		const order = {
			items: orderState.items.map((item) => ({
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

	const orderContext = {
		...orderState,
		setOrder: (order) =>
			dispatchOrderAction({ type: 'GENERAL', method: 'SET', order }),
		addItem: (item) =>
			dispatchOrderAction({ type: 'ITEM', method: 'ADD', item }),
		updateItem: (item) =>
			dispatchOrderAction({ type: 'ITEM', method: 'UPDATE', item }),
		removeItem: (item) =>
			dispatchOrderAction({ type: 'ITEM', method: 'REMOVE', item }),
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
