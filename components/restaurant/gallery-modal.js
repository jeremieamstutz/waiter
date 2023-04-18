import Modal from 'components/ui/modal'
import { useRestaurant } from 'contexts/restaurant'
import Image from 'next/image'

export default function GalleryModal({ onClose }) {
	const { restaurant } = useRestaurant()
	return (
		<Modal title="Images" onClose={onClose} style={{ maxWidth: '60rem' }}>
			<div
				style={{
					display: 'grid',
					gap: '1.5rem',
					gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr)',
				}}
			>
				{restaurant.images.map((image) => (
					<div key={image.id}>
						<Image
							alt={image?.alt ?? ''}
							src={image?.url ?? '/images/defaults/item.png'}
							width={400}
							height={300}
							sizes="640px"
							style={{
								display: 'block',
								width: '100%',
								height: 'auto',
								aspectRatio: 4 / 3,
								objectFit: 'cover',
							}}
						/>
					</div>
				))}
			</div>
		</Modal>
	)
}
