import { HistoryProvider } from 'contexts/history'

export default function Providers({ children }) {
	return <HistoryProvider>{children}</HistoryProvider>
}
