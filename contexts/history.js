import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import * as gtag from '../utils/gtag'

const isProduction = process.env.NODE_ENV === 'production'

export const HistoryContext = createContext({
	history: [],
	back: () => {},
})

export function HistoryProvider({ children }) {
	const { asPath, push } = useRouter()

	const [history, setHistory] = useState([])

	const back = () => {
		push(history.slice(-2)[0])

		const newHistory = history.slice(0, -1)
		setHistory(newHistory)
	}

	useEffect(() => {
		const title = document.title
		const location = window.location.href
		const pathname = window.location.pathname
		if (isProduction) gtag.pageview(title, location, pathname)

		setHistory((previous) => [...previous, asPath])
	}, [asPath])
	
	const historyContext = { history, back }

	return (
		<HistoryContext.Provider value={historyContext}>
			{children}
		</HistoryContext.Provider>
	)
}

export function useHistory() {
	return useContext(HistoryContext)
}
