import axios from 'axios'
import { useState } from 'react'

export default function useUploadFile(apiUrl) {
	const [loading, setLoading] = useState(false)
	const [progress, setProgress] = useState(0)

	async function uploadFile(file) {
		setLoading(true)
		try {
			const signedUrl = await axios.post(apiUrl, {
				filename: file.name,
				type: file.type,
			})

			await axios.put(signedUrl.data.url, file, {
				headers: {
					'Content-Type': file.type,
					'x-amz-acl': 'public-read',
					'Cache-Control': 'max-age=31536000',
				},
				onUploadProgress: (progressEvent) => {
					const { loaded, total } = progressEvent
					const progress = (loaded / total) * 100
					setProgress(progress)
				},
			})

			const fileUrl = signedUrl.data.url.split('?')[0]
			setLoading(false)
			setProgress(0)
			return fileUrl
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	return { loading, progress, uploadFile }
}
