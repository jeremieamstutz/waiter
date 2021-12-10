import { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'

import classes from './image-picker.module.css'
import { Ring } from './spinner'
import sleep from 'utils/sleep'

export default function ImagePicker({ url, setUrl, style }) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState()

	const uploadImage = async (image) => {
		setLoading(true)
		// await sleep(2000)
		try {
			const signedUrl = await axios.post('/api/upload', {
				filename: image.name,
				type: image.type,
			})

			await axios.put(signedUrl.data.url, image, {
				headers: {
					'Content-Type': image.type,
					'x-amz-acl': 'public-read',
					'Cache-Control': 'max-age=31536000',
				},
			})

			const imageUrl = signedUrl.data.url.split('?')[0]
			setUrl(imageUrl)
		} catch (error) {
			setError(true)
		}
		setLoading(false)
	}

	const onDrop = async (files) => {
		if (files.length === 0) return
		const file = files[0]
		uploadImage(file)
		// const reader = new FileReader()
		// reader.onloadend = () => {
		// 	setPreview(reader.result)
		// }
		// reader.readAsDataURL(file)
	}

	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			accept: 'image/jpeg, image/png',
			maxFiles: 1,
			multiple: false,
			maxSize: 20971520, // 20 MB
			onDrop,
		})

	return (
		<>
			<div
				arial-label="Image"
				{...getRootProps({
					className: `${classes.container} ${
						isDragActive ? classes.active : ''
					} ${isDragReject ? classes.reject : ''}`,
				})}
				style={style}
			>
				<input {...getInputProps()} />
				{loading ? (
					<Ring />
				) : error || isDragReject ? (
					<div className={classes.message}>
						<p
							className={classes.text}
							style={{ color: 'var(--color-danger)' }}
						>
							{isDragReject
								? 'This file format is not allowed'
								: 'An error occured. Please try again.'}
						</p>
					</div>
				) : url ? (
					<div
						style={{
							position: 'relative',
							flex: '1',
							alignSelf: 'stretch',
						}}
					>
						<Image
							src={url}
							alt="File preview"
							layout="fill"
							className={classes.image}
							priority={true}
						/>
					</div>
				) : (
					<div className={classes.message}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={48}
							height={48}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className={classes.logo}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<p className={classes.text}>
							Click to select your image
						</p>
					</div>
				)}
			</div>
		</>
	)
}
