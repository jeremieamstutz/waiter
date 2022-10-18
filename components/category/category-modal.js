import { useSession } from 'next-auth/react'

import { useRestaurant } from 'contexts/restaurant'

import Modal from 'components/ui/modal'
import ItemCard, { NewItemCard } from 'components/item/item-card'

import classes from './category-modal.module.css'

export default function CategoryModal({ category, items, onClose }) {
	const { data: session, status } = useSession()
	const { restaurant } = useRestaurant()
	return (
		<Modal
			title={category.name}
			style={{ maxWidth: '60rem' }}
			onClose={onClose}
		>
			{category.description && (
				<p
					style={{
						textAlign: 'center',
						margin: '0rem 0 1.5rem',
					}}
				>
					{category.description}
				</p>
			)}
			<div className={classes.list}>
				{items.map((item) => (
					<ItemCard item={item} key={item.id} />
				))}
				{status === 'authenticated' &&
					(session.user.id === restaurant.ownerId ||
						session.user.role === 'admin') && (
						<NewItemCard category={category} />
					)}
			</div>
		</Modal>
	)
}
