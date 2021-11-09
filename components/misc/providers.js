import { AnimationProvider } from 'contexts/animate'
import { HistoryProvider } from 'contexts/history'

export default function Providers({ children }) {
	return (
		<HistoryProvider>
			<AnimationProvider>{children}</AnimationProvider>
		</HistoryProvider>
	)
}
