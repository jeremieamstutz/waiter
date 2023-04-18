import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import ItemCard, { NewItemCard } from './item-card'

import { useRestaurant } from 'contexts/restaurant'

const NUM_PREVIEW = 5

import classes from './item-list.module.css'

export default function ItemList({ category }) {
	const { data: session, status } = useSession()
	const { t } = useTranslation()
	const router = useRouter()
	const { restaurant } = useRestaurant()

	const items = restaurant.filteredItems.filter(
		(item) => item.categoryId === category.id,
	)

	return (
		<section>
			<div className={classes.header}>
				<div classes={classes.body}>
					<h2 className={classes.title}>{category.name}</h2>
					{category.description && (
						<p className={classes.description}>
							{category.description}
						</p>
					)}
				</div>
				{status === 'authenticated' &&
					(session.user.id === restaurant.ownerId ||
						session.user.role === 'admin') && (
						<div style={{ display: 'flex', gap: '0.5rem' }}>
							{/* <button
								onClick={() =>
									router.push(
										{
											pathname: router.pathname,
											query: {
												...router.query,
												showNewItem: true,
												restaurantId: restaurant.id,
												categoryId: category.id,
											},
										},
										undefined,
										{ shallow: true },
									)
								}
								style={{ minHeight: '3rem', height: 'auto' }}
							>
								Ajouter un élément
								{t('item:actions.newItem')}
							</button> */}
							<button
								onClick={() =>
									router.push(
										{
											pathname: router.pathname,
											query: {
												restaurantSlug:
													router.query.restaurantSlug,
												editCategory: category.id,
											},
										},
										undefined,
										{ shallow: true },
									)
								}
							>
								Modifier la section
								{/* {t('common:misc.actions.edit')} */}
							</button>
						</div>
					)}
			</div>
			<div className={classes.items}>
				{items.map((item) => (
					<ItemCard key={item.id} item={item} />
				))}
				{status === 'authenticated' &&
					(session.user.id === restaurant.ownerId ||
						session.user.role === 'admin') && (
						<button
							onClick={() =>
								router.push(
									{
										pathname: router.pathname,
										query: {
											...router.query,
											showNewItem: true,
											restaurantId: restaurant.id,
											categoryId: category.id,
										},
									},
									undefined,
									{ shallow: true },
								)
							}
							style={{ minHeight: '3rem', height: 'auto' }}
						>
							{t('item:actions.newItem')}
						</button>
					)}
			</div>
		</section>
	)
}
