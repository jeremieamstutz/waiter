import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import { useRestaurant } from 'contexts/restaurant'

import classes from './header.module.css'

export default function Header() {
	const { restaurant } = useRestaurant()
	const router = useRouter()
	const [session, loading] = useSession()
	return (
		<section>
			<div className={classes.container}>
				<h1 className={classes.title}>{restaurant.name}</h1>
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
