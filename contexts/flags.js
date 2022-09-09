import { createContext, useContext } from 'react'
import useSWR from 'swr'

export const FlagsContext = createContext({ flags: {} })

const defaultFlags = {}

export const FlagsProvider = ({ children }) => {
	const { data: flags } = useSWR('/api/flags', {
		fallbackData: defaultFlags,
	})

	return (
		<FlagsContext.Provider value={{ flags }}>
			{children}
		</FlagsContext.Provider>
	)
}

export const useFlags = () => {
	return useContext(FlagsContext)
}
