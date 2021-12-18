import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useLongPress from 'hooks/useLongPress'

import classes from './item-card.module.css'
import { useSession } from 'next-auth/react'

export default function ItemCard({ item, category, index }) {
	const router = useRouter()
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

	if (
		session?.user.id !== item.ownerId &&
		session?.user.role !== 'admin' &&
		item.available === false
	) {
		return null
	}

	return (
		<Link
			href={{
				pathname: '/[restaurantSlug]/[categorySlug]/[itemSlug]',
				query: {
					restaurantSlug: item.restaurantSlug,
					categorySlug: item.categorySlug,
					itemSlug: item.slug,
				},
			}}
		>
			<a
				className={`${classes.card} ${
					item.available === false ? classes.unavailable : ''
				}`}
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
						objectPosition="left"
						width={171}
						height={256}
						priority={index < 2}
						sizes="50vw"
					/>
				</div>
				{/* {item.restaurantName && (
					<div style={{padding: ' 0.35rem 0 0', marginBottom: '-0.15rem', color: '#666'}}>{item.restaurantName}</div>
				)} */}
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
			</a>
		</Link>
	)
}

export function NewItemCard({ category }) {
	const router = useRouter()

	return (
		<div className={classes.skeleton}>
			<Link
				href={{
					pathname: '/[restaurantSlug]/items/new',
					query: {
						restaurantSlug: router.query.restaurantSlug,
						categoryId: category.id,
					},
				}}
			>
				<a className={classes.card}>
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
					<h3 className={classes.title}>Nouvel élément</h3>
					<p className={classes.description}>
						Ajouter un élément à cette liste
					</p>
				</a>
			</Link>
		</div>
	)
}
