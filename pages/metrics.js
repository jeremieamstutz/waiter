import Container from 'components/layout/container'
import Header from 'components/layout/header'
import HorizontalRule from 'components/ui/horizontal-rule'

import classes from 'styles/metrics.module.css'
import { query } from 'utils/db'

export default function MetricsPage({
	newSince,
	totalUsers,
	newUsers,
	totalRestaurants,
	newRestaurants,
	totalItems,
	newItems,
}) {
	return (
		<>
			<Container>
				<h1>Metrics</h1>
				<div className={classes.metric}>
					<h2 className={classes.title}>Total users</h2>
					<div className={classes.body}>
						<div>
							<span className={classes.value}>{totalUsers}</span>
							{/* <small className={classes.previous}>
								from 504 last month
							</small> */}
						</div>
						{/* <span className={classes.trend}>+15%</span> */}
					</div>
				</div>
				<div className={classes.metric}>
					<h2 className={classes.title}>New users</h2>
					<p className={classes.comment}>
						Since last {newSince} days
					</p>
					<div className={classes.body}>
						<div>
							<span className={classes.value}>+{newUsers}</span>

							{/* <small className={classes.previous}>from 30</small> */}
						</div>
						{/* <span className={classes.trend}>+100%</span> */}
					</div>
				</div>
				<HorizontalRule />
				<div className={classes.metric}>
					<h2 className={classes.title}>Total restaurants</h2>
					<div className={classes.body}>
						<div>
							<span className={classes.value}>
								{totalRestaurants}
							</span>
							{/* <small className={classes.previous}>from 504</small> */}
						</div>
						{/* <span className={classes.trend}>+15%</span> */}
					</div>
				</div>
				<div className={classes.metric}>
					<h2 className={classes.title}>New restaurants</h2>
					<p className={classes.comment}>
						Since last {newSince} days
					</p>
					<div className={classes.body}>
						<div>
							<span className={classes.value}>
								+{newRestaurants}
							</span>
							{/* <small className={classes.previous}>from 30</small> */}
						</div>
						{/* <span className={classes.trend}>+100%</span> */}
					</div>
				</div>
				<HorizontalRule />
				<div className={classes.metric}>
					<h2 className={classes.title}>Total items</h2>
					<div className={classes.body}>
						<div>
							<span className={classes.value}>{totalItems}</span>
							{/* <small className={classes.previous}>from 504</small> */}
						</div>
						{/* <span className={classes.trend}>+15%</span> */}
					</div>
				</div>
				<div className={classes.metric}>
					<h2 className={classes.title}>New items</h2>
					<p className={classes.comment}>
						Since last {newSince} days
					</p>
					<div className={classes.body}>
						<div>
							<span className={classes.value}>+{newItems}</span>

							{/* <small className={classes.previous}>from 30</small> */}
						</div>
						{/* <span className={classes.trend}>+100%</span> */}
					</div>
				</div>
				<HorizontalRule />
				<div className={classes.metric}>
					<h2 className={classes.title}>Recurring revenue</h2>
					<div className={classes.body}>
						<div>
							<span className={classes.value}>0 CHF</span>
							{/* <small className={classes.previous}>from 30</small> */}
						</div>
						{/* <span className={classes.trend}>+100%</span> */}
					</div>
				</div>
			</Container>
			<Header />
		</>
	)
}

export async function getStaticProps() {
	const newSince = 7 // days
	const totalUsers = +(await query(`SELECT COUNT(*) FROM users`)).rows[0]
		.count

	const newUsers = +(
		await query(
			`SELECT COUNT(*) FROM users WHERE created_at >= current_date - ${newSince}`,
		)
	).rows[0].count

	const totalRestaurants = +(await query(`SELECT COUNT(*) FROM restaurants`))
		.rows[0].count

	const newRestaurants = +(
		await query(
			`SELECT COUNT(*) FROM restaurants WHERE created_at >= current_date - ${newSince}`,
		)
	).rows[0].count

	const totalItems = +(await query(`SELECT COUNT(*) FROM items`)).rows[0]
		.count

	const newItems = +(
		await query(
			`SELECT COUNT(*) FROM items WHERE created_at >= current_date - ${newSince}`,
		)
	).rows[0].count

	return {
		props: {
			newSince,
			totalUsers,
			newUsers,
			totalRestaurants,
			newRestaurants,
			totalItems,
			newItems,
		},
		revalidate: 5,
	}
}
