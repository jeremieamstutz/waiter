import { useId, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useField } from 'formik'

import useUploadFile from 'hooks/useUploadFile'

import CircularProgressBar from 'components/ui/progress-bar'

import PlusIcon from 'components/icons/plus'
import TrashIcon from 'components/icons/trash'

import classes from './image-picker.module.css'

export default function ImagePicker({ label, help, ...props }) {
	const { t } = useTranslation()
	const fileInputRef = useRef()
	const fileInputId = useId()
	const [field, meta, helpers] = useField(props)

	let { loading, progress, uploadFile } = useUploadFile('/api/upload')
	const [preview, setPreview] = useState()

	async function handleFileInput(event) {
		const file = event.target.files[0]
		if (file) {
			setPreview(URL.createObjectURL(file))
			const url = await uploadFile(file)
			helpers.setValue(url)
			setPreview()
		}
	}

	async function handleDelete() {
		helpers.setValue('')
	}

	return (
		<div className={classes['form-group']}>
			{label && <label htmlFor={fileInputId}>{label}</label>}
			{field.value ? (
				<div
					style={{
						position: 'relative',
					}}
				>
					<Image
						alt=""
						src={field.value}
						width={640}
						height={640}
						sizes="640px"
						style={{
							display: 'block',
							width: '100%',
							height: 'auto',
							aspectRatio: 1,
							objectFit: 'cover',
						}}
					/>
					<button
						style={{
							minWidth: 0,
							padding: '0.5rem',
							position: 'absolute',
							top: '1rem',
							right: '1rem',
							borderRadius: '0.75rem',
							width: '2.5rem',
							height: '2.5rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							cursor: 'pointer',
							background: '#fff',
						}}
						onClick={handleDelete}
					>
						<TrashIcon />
					</button>
				</div>
			) : (
				<div>
					<input
						ref={fileInputRef}
						id={fileInputId}
						type="file"
						onChange={handleFileInput}
						style={{ display: 'none' }}
					/>
					{loading ? (
						<div
							style={{
								position: 'relative',
							}}
						>
							<Image
								alt=""
								src={preview}
								width={640}
								height={640}
								sizes="640px"
								style={{
									display: 'block',
									width: '100%',
									height: 'auto',
									aspectRatio: 1,
									objectFit: 'cover',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									translate: '-50% -50%',
								}}
							>
								<CircularProgressBar
									loading={loading}
									progress={progress}
								/>
							</div>
						</div>
					) : (
						<button
							type="button"
							onClick={() =>
								fileInputRef && fileInputRef.current.click()
							}
							style={{
								width: '100%',
								height: 'auto',
								aspectRatio: 2,
							}}
							className={
								meta.touched && meta.error
									? classes['input-error']
									: ''
							}
						>
							<span
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: '1rem',
									fontSize: '1.125rem',
								}}
							>
								<PlusIcon type="outline" />
								{t(
									'restaurant:modals.editRestaurantImages.actions.addImage',
								)}
							</span>
						</button>
					)}
				</div>
			)}
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
			{help && <div className={classes.help}>{help}</div>}
		</div>
	)
}
