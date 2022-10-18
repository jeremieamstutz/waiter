import Image from 'next/image'
import { useRouter } from 'next/router'

import { useOrder } from 'contexts/order'

import classes from './item-card.module.css'
import { useRestaurant } from 'contexts/restaurant'
import { useTranslation } from 'next-i18next'

export default function ItemCard({ item, lazyRoot }) {
	const { order } = useOrder()
	const router = useRouter()
	const { t } = useTranslation()

	return (
		<>
			<div
				className={classes.card}
				onClick={() =>
					router.push(
						{
							pathname: router.pathname,
							query: {
								...router.query,
								item: item.id,
							},
						},
						undefined,
						{ shallow: true },
					)
				}
			>
				<div className={classes.image}>
					<Image
						alt={item?.name || ''}
						src={item?.image || '/images/defaults/item.png'}
						layout="responsive"
						objectFit="cover"
						width={290}
						height={435}
						sizes="480px"
						lazyRoot={lazyRoot}
					/>
					<div
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							background: 'rgba(0,0,0,0.5)',
							boxShadow: '0 0 #aaa',
							borderRadius: '0.75rem',
							color: 'white',
							fontSize: '2rem',
							transition: '100ms',
							opacity:
								order?.items.filter(
									(itm) => itm.id === item.id,
								)[0]?.quantity > 0
									? 1
									: 0,
						}}
					>
						{
							order?.items.filter((itm) => itm.id === item.id)[0]
								?.quantity
						}
					</div>
				</div>
				<div className={classes.body}>
					{/* {!item.available ? (
						<div
							style={{
								color: '#d00',
								margin: '0.125rem 0 0.25rem',
							}}
						>
							{t('item:status.unavailable')}
						</div>
					) : index % 7 == 0 ? (
						<div
							style={{
								color: '#e67e22',
								margin: '0.125rem 0 0.25rem',
							}}
						>
							{t('item:status.new')}
							Sélection du chef
						Recommandé
						Populaire
						</div>
					) : null} */}
					<h3 className={classes.title}>{item.name}</h3>
					<p className={classes.description}>{item.description}</p>
					<p className={classes.details}>
						<span className={classes.price}>
							CHF {parseFloat(item.price).toFixed(2)}
						</span>
						{/* <span className={classes.grade}>
					{(2 * Math.random() + 3).toFixed(2)}
				</span> */}
						{/* {quantity > 0 ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={3}
							d="M20 12H4"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={20}
						height={20}
						fill="none"
						viewBox="0 0 24 24"
						stroke="#000000"
						style={{ marginRight: '0.5rem' }}
						{...longPressProps}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={3}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				)} */}
					</p>
				</div>
			</div>
		</>
	)
}

export function NewItemCard({ category }) {
	const router = useRouter()
	const { t } = useTranslation()

	const { restaurant } = useRestaurant()

	return (
		<div className={classes.skeleton}>
			<div
				className={classes.card}
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
			>
				<div className={classes.image}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</div>
				<div className={classes.body}>
					<h3 className={classes.title}>
						{t('item:buttons.new.title')}
					</h3>
					<p className={classes.description}>
						{t('item:buttons.new.description')}
					</p>
				</div>
			</div>
		</div>
	)
}
