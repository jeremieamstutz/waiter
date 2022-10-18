import { useRef, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { mutate } from 'swr'
import { useTranslation } from 'next-i18next'

import { useRestaurant } from 'contexts/restaurant'
import useUploadFile from 'hooks/useUploadFile'

import Modal from 'components/ui/modal'
import CircularProgressBar from 'components/ui/progress-bar'

import PlusIcon from 'components/icons/plus'
import TrashIcon from 'components/icons/trash'

function ImagePicker() {
	const { t } = useTranslation()
	const { restaurant } = useRestaurant()
	const { loading, progress, uploadFile } = useUploadFile('/api/upload')

	const [preview, setPreview] = useState()
	const fileInputRef = useRef()

	async function handleFileInput(event) {
		const file = event.target.files[0]
		if (file) {
			setPreview(URL.createObjectURL(file))
			const url = await uploadFile(file)
			const newImage = {
				url,
				alt: restaurant.name,
				order: restaurant.images.length,
			}
			await axios.post(
				`/api/restaurants/${restaurant.id}/images`,
				newImage,
			)
			await mutate(`/api/restaurants/${restaurant.id}`)
			setPreview()
		}
	}

	return (
		<>
			<div>
				<input
					ref={fileInputRef}
					type="file"
					onChange={handleFileInput}
					style={{ display: 'none' }}
				/>
				{loading ? (
					<div
						style={{
							aspectRatio: '4 / 3',
							borderRadius: '0.5rem',
							position: 'relative',
						}}
					>
						<Image
							alt=""
							src={preview}
							layout="responsive"
							objectFit="cover"
							width={400}
							height={300}
							sizes="640px"
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
							aspectRatio: '4 / 3',
						}}
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
		</>
	)
}

function ImageCard({ image }) {
	const { restaurant } = useRestaurant()

	async function handleDelete() {
		await axios.delete(
			`/api/restaurants/${restaurant.id}/images/${image.id}`,
		)
		await mutate(`/api/restaurants/${restaurant.id}`)
	}

	return (
		<div
			style={{
				aspectRatio: 4 / 3,
				borderRadius: '0.5rem',
				position: 'relative',
			}}
		>
			<Image
				alt={image?.alt ?? ''}
				src={image?.url ?? '/images/defaults/item.png'}
				layout="responsive"
				objectFit="cover"
				width={400}
				height={300}
				sizes="640px"
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
			{/* <button
				className="text"
				style={{
					marginTop: '0.75rem',
				}}
			>
				Add a legend
			</button> */}
		</div>
	)
}

export default function EditRestaurantImagesModal({ onClose }) {
	const { t } = useTranslation()
	const { restaurant } = useRestaurant()

	return (
		<Modal
			title={t('restaurant:modals.editRestaurantImages.title')}
			onClose={onClose}
			style={{ maxWidth: '60rem' }}
		>
			<div
				style={{
					display: 'grid',
					gap: '1.5rem',
					gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr)',
				}}
			>
				{restaurant.images.map((image) => (
					<ImageCard key={image.id} image={image} />
				))}
				<ImagePicker />
			</div>
		</Modal>
	)
}
