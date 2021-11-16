import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import axios from 'axios'

import classes from './item-detail.module.css'

export default function ItemDetail({ item }) {
	const router = useRouter()
	const { data: session, status } = useSession()

	// item.allergies = [
	// 	'Moluscs',
	// 	'Eggs',
	// 	'Fish',
	// 	'Lupin',
	// 	'Soya',
	// 	'Milk',
	// 	'Peanuts',
	// 	'Gluten',
	// 	'Crustaceans',
	// 	'Mustard',
	// 	'Nuts',
	// 	'Sesame',
	// 	'Celery',
	// 	'Sulphite'
	// ]
	const handleDeleteItem = async () => {
		await axios.delete(`/api/items/${item.id}`)
		router.push({
			pathname: '/[restaurantSlug]',
			query: {
				restaurantSlug: router.query.restaurantSlug,
			},
		})
	}
	return (
		<>
			<div className={classes.image}>
				<Image
					src={item.image}
					alt={item.name}
					layout="responsive"
					objectFit="cover"
					objectPosition="left"
					width={375}
					height={470} // 500
					priority={true}
				/>
			</div>
			<div className={classes.container}>
				<h1 className={classes.name}>{item.name}</h1>
				{item.description && (
					<p className={classes.description}>{item.description}</p>
				)}
				{item.allergies && (
					<div className={classes.allergies}>
						{item.allergies.map((allergy, index) => (
							<span className={classes.allergy} key={index}>
								{allergy}
							</span>
						))}
					</div>
				)}
				<p className={classes.price}>
					CHF {parseFloat(item.price).toFixed(2)}
				</p>
				{status === 'authenticated' &&
					(session.user.id === item.ownerId ||
						session.user.role === 'admin') && (
						<div className={classes.actions}>
							<Link
								href={{
									pathname: router.pathname + '/edit',
									query: router.query,
								}}
							>
								<a className="button secondary">Edit</a>
							</Link>
							<button
								className="button"
								onClick={handleDeleteItem}
							>
								Delete
							</button>
						</div>
					)}
			</div>
		</>
	)
}
