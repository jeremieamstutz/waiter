import axios from 'axios'
import useSWR from 'swr'

// TODO: move translation to the serve to save everything
export default function translate(string, opts) {
	const { from, to } = opts

	const base = 'https://translation.googleapis.com/language/translate/v2'
	const params = new URLSearchParams({
		q: string,
		...(from && { source: from }),
		target: to || 'en',
		format: 'text',
		key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
	})
	const url = base + '?' + params

	const fetcher = (url) =>
		axios.post(url).then((res) => {
			return res.data.data.translations[0].translatedText
		})

	const { data: translation } = useSWR(url, fetcher, {
		fallbackData: string,
	})

	return translation
}
