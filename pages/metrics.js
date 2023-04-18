// import {
// 	LineChart,
// 	Line,
// 	YAxis,
// 	XAxis,
// 	Tooltip,
// 	ReferenceLine,
// 	ResponsiveContainer,
// } from 'recharts'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'

import classes from 'styles/metrics.module.css'
import { query } from 'utils/db'
import { useState } from 'react'

const data = [
	{
		date: new Date(2022, 0, 1),
		users: 0,
	},
	{
		date: new Date(2022, 0, 2),
		users: 1,
	},
	{
		date: new Date(2022, 0, 3),
		users: 4,
	},
	{
		date: new Date(2022, 0, 4),
		users: 8,
	},
	{
		date: new Date(2022, 0, 5),
		users: 19,
	},
	{
		date: new Date(2022, 0, 6),
		users: 29,
	},
	{
		date: new Date(2022, 0, 7),
		users: 88,
	},
	{
		date: new Date(2022, 0, 8),
		users: 19,
	},
	{
		date: new Date(2022, 0, 10),
		users: 29,
	},
	{
		date: new Date(2022, 0, 11),
		users: 88,
	},
]

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div style={{ color: '#666' }}>
				{label.toLocaleDateString('en-US', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</div>
		)
	}

	return null
}

// function Chart({ name, key, value, data }) {
// 	const initialValue = data[data.length - 1].users
// 	const [selectedRange, setSelectedRange] = useState('1W')
// 	const [currentValue, setCurrentValue] = useState(initialValue)
// 	// const [position, setPosition] = useState()
// 	return (
// 		<div
// 			style={{
// 				display: 'flex',
// 				flexDirection: 'column',
// 				gap: '1rem',
// 				background: '#eee',
// 				borderRadius: '1rem',
// 				padding: '1.5rem',
// 			}}
// 		>
// 			<h2 style={{ margin: 0, fontSize: '1.5rem' }}>{name}</h2>
// 			<div style={{ fontSize: '1.5rem' }}>
// 				{currentValue === undefined ? initialValue : currentValue}
// 			</div>
// 			<ResponsiveContainer width="100%" height={200}>
// 				<LineChart
// 					data={data}
// 					onMouseMove={(event) => {
// 						setCurrentValue(event?.activePayload?.[0]?.value)
// 					}}
// 					onMouseLeave={() => setCurrentValue(initialValue)}
// 					margin={{ top: 32 }}
// 				>
// 					<Line
// 						dataKey="users"
// 						type="linear"
// 						strokeWidth={3}
// 						stroke="var(--color-primary)"
// 						dot={false}
// 					/>
// 					{/* <Tooltip
// 						wrapperStyle={{ visibility: 'visible' }}
// 						position={{ x: 0, y: -84 }}
// 						content={
// 						}
// 					/> */}
// 					<Tooltip
// 						cursor={{ stroke: '#ccc', strokeWidth: 2 }}
// 						content={CustomTooltip}
// 						// coordinate={{ x: 0, y: 0 }}
// 						position={{ y: 0 }}
// 					/>
// 					<ReferenceLine
// 					// x={position}
// 					// label="SALUT"
// 					// strokeWidth={3}
// 					// stroke="var(--color-primary)"
// 					/>
// 					<XAxis
// 						hide
// 						dataKey="date"
// 						tickFormatter={(tickItem) => tickItem.getDate()}
// 					/>
// 					<YAxis hide domain={['dataMin', 'dataMax']} width={20} />
// 				</LineChart>
// 			</ResponsiveContainer>
// 			<nav style={{ display: 'flex', gap: '0.5rem' }}>
// 				{['1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
// 					<button
// 						key={range}
// 						onClick={() => setSelectedRange(range)}
// 						style={{
// 							flex: 1,
// 							color: selectedRange === range ? 'white' : '#222',
// 							background: 'none',
// 							padding: 0,
// 							background:
// 								selectedRange === range
// 									? 'var(--color-primary)'
// 									: 'transparent',
// 						}}
// 					>
// 						{range}
// 					</button>
// 				))}
// 			</nav>
// 		</div>
// 	)
// }

export default function OpenPage({
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
				<Header />
				<Main>
					<h1>Metrics</h1>
					<div
						style={{
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<p>Work in progress</p>
					</div>
					<div
						style={{
							display: 'grid',
							gap: '1.5rem',
							gridTemplateColumns:
								'repeat(auto-fill, minmax(25rem, 1fr))',
						}}
					>
						{/* <Chart name="Users" data={data} />
						<Chart name="Restaurants" data={data} />
						<Chart name="Bookings" data={data} />
						<Chart name="Transactions" data={data} />
						<Chart name="Revenue" data={data} /> */}
					</div>

					{/* <div className={classes.metric}>
						<h2 className={classes.title}>Total users</h2>
						<div className={classes.body}>
							<div>
								<span className={classes.value}>
									{totalUsers}
								</span>
							</div>
						</div>
					</div>
					<div className={classes.metric}>
						<h2 className={classes.title}>New users</h2>
						<p className={classes.comment}>
							Since last {newSince} days
						</p>
						<div className={classes.body}>
							<div>
								<span className={classes.value}>
									+{newUsers}
								</span>
							</div>
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
							</div>
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
							</div>
						</div>
					</div>
					<HorizontalRule />
					<div className={classes.metric}>
						<h2 className={classes.title}>Total items</h2>
						<div className={classes.body}>
							<div>
								<span className={classes.value}>
									{totalItems}
								</span>
							</div>
						</div>
					</div>
					<div className={classes.metric}>
						<h2 className={classes.title}>New items</h2>
						<p className={classes.comment}>
							Since last {newSince} days
						</p>
						<div className={classes.body}>
							<div>
								<span className={classes.value}>
									+{newItems}
								</span>
							</div>
						</div>
					</div>
					<HorizontalRule />
					<div className={classes.metric}>
						<h2 className={classes.title}>Recurring revenue</h2>
						<div className={classes.body}>
							<div>
								<span className={classes.value}>0 CHF</span>
							</div>
						</div>
					</div> */}
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
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
			...(await serverSideTranslations(locale, ['common'])),
		},
		revalidate: 5,
	}
}
