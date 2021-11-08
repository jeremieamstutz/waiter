import Container from 'components/layout/container'
import Header from 'components/layout/header'

import classes from 'styles/metrics.module.css'
import { query } from 'utils/db'

export default function MetricsPage({
	totalUsers,
	newUsers,
	totalRestaurants,
	newRestaurants,
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
					<div className={classes.body}>
						<div>
							<span className={classes.value}>{newUsers}</span>
							{/* <small className={classes.previous}>from 30</small> */}
						</div>
						{/* <span className={classes.trend}>+100%</span> */}
					</div>
				</div>
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
					<div className={classes.body}>
						<div>
							<span className={classes.value}>
								{newRestaurants}
							</span>
							{/* <small className={classes.previous}>from 30</small> */}
						</div>
						{/* <span className={classes.trend}>+100%</span> */}
					</div>
				</div>
				{/* <div className={classes.metric}>
					<h2 className={classes.title}>Revenue</h2>
					<div className={classes.body}>
						<div>
							<span className={classes.value}>562</span>
							<small className={classes.previous}>from 30</small>
						</div>
						<span className={classes.trend}>+100%</span>
					</div>
				</div> */}
			</Container>
			<Header />
		</>
	)
}

export async function getStaticProps() {
	const totalUsers = +(await query(`SELECT COUNT(*) FROM users`)).rows[0]
		.count

	const newUsers = +(
		await query(
			`SELECT COUNT(*) FROM users WHERE created_at >= current_date - 30`,
		)
	).rows[0].count

	const totalRestaurants = +(await query(`SELECT COUNT(*) FROM restaurants`))
		.rows[0].count

	const newRestaurants = +(
		await query(
			`SELECT COUNT(*) FROM restaurants WHERE created_at >= current_date - 30`,
		)
	).rows[0].count

	return {
		props: {
			totalUsers,
			newUsers,
			totalRestaurants,
			newRestaurants,
		},
		revalidate: 5,
	}
}
