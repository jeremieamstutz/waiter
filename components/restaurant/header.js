import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { useRestaurant } from 'contexts/restaurant'

import classes from './header.module.css'
import { useEffect } from 'react'
import axios from 'axios'

export default function Header() {
	const { restaurant, setRestaurant } = useRestaurant()
	const router = useRouter()
	const [session, loading] = useSession()

	useEffect(() => {
		const fetchLike = async () => {
			const res = await axios.get(
				`/api/restaurants/${restaurant.id}/like`,
			)
			console.log(res.data.like)
			setRestaurant((restaurant) => ({
				...restaurant,
				like: res.data.like,
			}))
		}
		fetchLike()
	}, [restaurant.id, setRestaurant])

	const handleLikeRestaurant = () => {
		axios.post(`/api/restaurants/${restaurant.id}/like`, {
			like: !restaurant.like,
		})
		setRestaurant((restaurant) => ({
			...restaurant,
			like: !restaurant.like,
		}))
	}

	return (
		<section>
			<div className={classes.container}>
				<h1 className={classes.title}>
					{restaurant.name}
					{/* <button
						className={`${classes.like} ${
							restaurant.like ? classes.active : ''
						}`}
						onClick={handleLikeRestaurant}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
					</button> */}
				</h1>
				<div className={classes.details}>
					<p className={classes.description}>
						{restaurant.description}
					</p>
					<p className={classes.misc}>
						<span
							className={`${classes.opening} ${
								restaurant.isOpen
									? classes.opened
									: classes.closed
							}`}
						>
							Opened until 23:00
						</span>
						·
						<span>
							{restaurant.rating.value} ({restaurant.rating.count}
							)
						</span>
					</p>
				</div>
				<div className={classes.actions}>
					{!loading && !session ? (
						restaurant.allowBooking ? (
							<Link
								href={{
									pathname: router.pathname + '/booking',
									query: router.query,
								}}
							>
								<a
									className={`${classes.booking} button secondary`}
								>
									Book a table
								</a>
							</Link>
						) : null
					) : (
						<Link
							href={{
								pathname: router.pathname + '/bookings',
								query: router.query,
							}}
						>
							<a
								className={`${classes.booking} button secondary`}
							>
								Bookings
							</a>
						</Link>
					)}
					{/* {restaurant.allowBooking ? (
					<Link href="/lausanne/holycow/booking">
						<a className={`${classes.booking} button secondary`}>
							Book a table
						</a>
					</Link>
				) : null} */}
					{/* <Link href="/lausanne/holycow/bookings">
					<a className={`${classes.booking} button secondary`}>
						Bookings
					</a>
				</Link> */}
					<Link
						href={{
							pathname: router.pathname + '/about',
							query: router.query,
						}}
					>
						<a className={`${classes.moreInfo} button`}>
							More info
						</a>
					</Link>
				</div>
			</div>
		</section>
	)
}
