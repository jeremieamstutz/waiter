import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useLongPress from 'hooks/useLongPress'
import { useSession } from 'next-auth/react'
import { useOrder } from 'contexts/order'

import classes from './item-card.module.css'
import { useRestaurant } from 'contexts/restaurant'
import { useTranslation } from 'next-i18next'

export default function ItemCard({ item, category, index, lazyRoot }) {
	const orderContext = useOrder()
	const router = useRouter()
	const { t } = useTranslation()
	const { data: session } = useSession()

	const [quantity, setQuantity] = useState(0)

	const handleIncreaseQuantity = (event) => {
		event.preventDefault()
		setQuantity((prevQuantity) => prevQuantity + 1)
	}

	const handleDecreaseQuantity = (event) => {
		event.preventDefault()
		setQuantity((prevQuantity) => prevQuantity - 1)
	}

	const longPressProps = useLongPress({
		onClick: (event) => {
			if (event.cancelable) {
				event.preventDefault()
			}
			handleIncreaseQuantity(event)
		},
		onLongPress: (event) => {
			if (event.cancelable) {
				event.preventDefault()
			}
			prompt('Enter quantity')
		},
		delay: 500,
	})

	// if (
	// 	session?.user.id !== item.ownerId &&
	// 	session?.user.role !== 'admin' &&
	// 	item.available === false
	// ) {
	// 	return null
	// }

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
				{item.restaurantName && (
					<div
						style={{
							paddingBottom: '0.25rem',
							color: '#000',
							fontSize: '1.125rem',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{item.restaurantName}
					</div>
				)}
				<div className={classes.image}>
					{/* <div
					className={classes.picker}
					onClick={(event) => event.preventDefault()}
				>
					<span onClick={handleIncreaseQuantity}>
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
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</span>
					{quantity > 0 && (
						<>
							<span>{quantity}</span>
							<span onClick={handleDecreaseQuantity}>
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
							</span>
						</>
					)}
				</div> */}
					<Image
						src={
							item.image
								? item.image
								: '/images/defaults/item.png'
						}
						alt={item.name}
						layout="responsive"
						objectFit="cover"
						// objectPosition="left"
						width={290}
						height={435}
						priority={index < 2}
						sizes="50vw"
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
							// backdropFilter: 'saturate(0%)',
							opacity:
								orderContext.items.filter(
									(itm) => itm.id === item.id,
								)[0]?.quantity > 0
									? 1
									: 0,
						}}
					>
						{
							orderContext.items.filter(
								(itm) => itm.id === item.id,
							)[0]?.quantity
						}
					</div>
					<div
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							left: 0,
							right: 0,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{/* <div
							style={{
								flex: 1,
							}}
							className={classes.bottom}
						>
							<div
								className={`${classes.order} ${classes.bottom}`}
								style={{
									display: 'flex',
									justifyContent: 'stretch',
									gap: '0.5rem',
									position: 'absolute',
									left: '0.5rem',
									right: '0.5rem',
									background: '#222',
									borderRadius: '0.75rem',
									padding: '0.5rem',
									boxShadow: '0 0 6rem rgba(255,255,255,0.5)',
								}}
							>
								<button
									aria-label="Remove one item"
									onClick={(event) => {
										event.stopPropagation()
										orderContext.removeItem(item)
									}}
									className="secondary"
									style={{
										flex: 1,
										minWidth: 0,
										padding: 0,
										cursor:
											orderContext.items.filter(
												(itm) => itm.id === item.id,
											).length === 0
												? 'not-allowed'
												: 'pointer',
									}}
									disabled={
										orderContext.items.filter(
											(itm) => itm.id === item.id,
										)[0]?.quantity <= 0
									}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M18 12H6"
										/>
									</svg>
								</button>
								<button
									aria-label="Add one item"
									onClick={(event) => {
										event.stopPropagation()
										orderContext.addItem(item)
									}}
									style={{
										flex: 1,
										padding: 0,
										minWidth: 0,
									}}
									className="secondary"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
								</button>
							</div>
						</div> */}
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
