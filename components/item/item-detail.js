import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import axios from 'axios'

import Footer from 'components/layout/footer'

import classes from './item-detail.module.css'

export default function ItemDetail({ item }) {
	const router = useRouter()
	const [session, loading] = useSession()

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
	item.allergies = ['Gluten', 'Mustard']
	const handleDeleteItem = async () => {
		await axios.delete(`/api/items/${item.id}`)
		router.push({
			pathname: '/[citySlug]/[restaurantSlug]',
			query: {
				citySlug: router.query.citySlug,
				restaurantSlug: router.query.restaurantSlug
			},
		})
	}
	return (
		<>
			<Head>
				<title>
					{item.name} - {item.category.name} - Waiter
				</title>
				<meta name="description" content={item.description} />
				<meta
					property="og:title"
					content={
						item.name + '- ' + item.category.name + ' - Waiter'
					}
				/>
				<meta property="og:description" content={item.description} />
				<meta property="og:image" content={item.image} />
				<meta property="og:url" content="https://www.waiter.so" />
				<meta property="og:type" content="restaurant.menu" />
			</Head>
			<section>
				<Image
					className={classes.image}
					src={item.image}
					alt={item.name}
					layout="responsive"
					objectFit="cover"
					objectPosition="left"
					width={375}
					height={470} // 500
					priority={true}
				/>
				<div className={classes.container}>
					<h1 className={classes.name}>{item.name}</h1>
					<p className={classes.description}>{item.description}</p>
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
					{!loading && session && (
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
			</section>
			<Footer />
		</>
	)
}
