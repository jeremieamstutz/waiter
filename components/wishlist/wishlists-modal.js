import Image from 'next/image'
import { useState } from 'react'

import EditWishlistModal from './edit-wishlist-modal'

import Modal from 'components/ui/modal'
import Plus from 'components/icons/plus'
import { useRouter } from 'next/router'

const WISHLISTS = [
	{
		id: 1,
		image: 'https://waiter.fra1.digitaloceanspaces.com/bfd61c7b-528f-4776-9356-da02293abde3',
		name: 'Restos romantiques',
		numRestaurants: 6,
	},
	{
		id: 2,
		image: 'https://waiter.fra1.digitaloceanspaces.com/967b5bfe-c266-477d-95f1-ccd410d0aaca',
		name: 'Voyage à Paris',
		numRestaurants: 14,
	},
	{
		id: 3,
		image: 'https://waiter.fra1.digitaloceanspaces.com/e44d083a-e06f-4d7d-b4c4-69f0f9456d82',
		name: 'Vacances à Verbier',
		numRestaurants: 5,
	},
	{
		id: 4,
		image: 'https://waiter.fra1.digitaloceanspaces.com/bb02364c-8235-454f-b96f-ee31984dd915',
		name: 'Gastros à essayer',
		numRestaurants: 8,
	},
]

function Wishlist({ wishlist }) {
	return (
		<button
			style={{
				display: 'flex',
				justifyContent: 'start',
				gap: '1rem',
				background: 'none',
				height: 'auto',
				padding: 0,
			}}
		>
			<Image
				alt={wishlist.name}
				src={wishlist.image ?? ''}
				width={64}
				height={64}
				objectFit="cover"
			/>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					gap: '0.25rem',
				}}
			>
				<h3 style={{ fontSize: '1.125rem', margin: 0 }}>
					{wishlist.name}
				</h3>
				<p style={{ margin: 0 }}>
					{wishlist.numRestaurants} restaurants
				</p>
			</div>
		</button>
	)
}

export default function WishlistsModal({ onClose }) {
	const router = useRouter()
	return (
		<>
			<Modal title="Your wishlists" onClose={onClose}>
				<section
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '1.5rem',
					}}
				>
					<button
						style={{
							display: 'flex',
							justifyContent: 'start',
							gap: '1rem',
							background: 'none',
							height: 'auto',
							padding: 0,
						}}
						onClick={() => {
							const { showWishlists, ...query } = router.query
							router.push(
								{
									pathname: router.pathname,
									query: {
										...query,
										showEditWishlist: true,
									},
								},
								undefined,
								{ shallow: true },
							)
						}}
					>
						<div
							style={{
								width: 64,
								height: 64,
								background: '#ddd',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderRadius: '0.5rem',
							}}
						>
							<Plus />
						</div>
						<span style={{ fontSize: '1.125rem' }}>
							New wishlist
						</span>
					</button>
					{WISHLISTS.map((wishlist) => (
						<Wishlist wishlist={wishlist} key={wishlist.id} />
					))}
				</section>
			</Modal>
		</>
	)
}
