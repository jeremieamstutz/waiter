import { AnimatePresence } from 'framer-motion'

import { OrderProvider } from 'contexts/order'
import { FlagsProvider } from 'contexts/flags'

export default function Providers({ children }) {
	return (
		<FlagsProvider>
			<OrderProvider>
				<AnimatePresence key="page">{children}</AnimatePresence>
			</OrderProvider>
		</FlagsProvider>
	)
}
