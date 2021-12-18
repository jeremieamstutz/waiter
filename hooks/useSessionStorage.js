import { useEffect, useState } from 'react'

const cache = {}

export default function useSessionStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState()

	useEffect(() => {
		if (cache[key]) {
			setStoredValue(cache[key])
		} else {
			const item = window.sessionStorage.getItem(key)
			const value = item ? JSON.parse(item) : initialValue

			setStoredValue(value)
			cache[key] = value
		}
	}, [])

	const setValue = (value) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value

			setStoredValue(valueToStore)
			cache[key] = valueToStore
			window.sessionStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.log(error)
		}
	}
	return [storedValue, setValue]
}
