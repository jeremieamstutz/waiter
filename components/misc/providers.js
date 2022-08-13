import { AnimatePresence } from 'framer-motion'

import { HistoryProvider } from 'contexts/history'
import { OrderProvider } from 'contexts/order'

export default function Providers({ children }) {
	return (
		<HistoryProvider>
			<OrderProvider>
				<AnimatePresence key="page">{children}</AnimatePresence>
			</OrderProvider>
		</HistoryProvider>
	)
}
