import { createContext, useContext } from 'react'
import useSWR from 'swr'

export const FlagsContext = createContext({ flags: {} })

export const FlagsProvider = ({ initialValue, children }) => {
	const { data: rawFlags } = useSWR('/api/flags', {
		fallbackData: initialValue || [],
	})

	const flags = rawFlags.reduce(
		(obj, item) => ({
			...obj,
			[item.key]: item.enabled,
		}),
		{},
	)

	return (
		<FlagsContext.Provider value={{ rawFlags, flags }}>
			{children}
		</FlagsContext.Provider>
	)
}

export const useFlags = () => {
	return useContext(FlagsContext)
}
