import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function BookingCard({ booking }) {
	// time, name, num, table, note, status
	return (
		<tr>
			<td>
				{/* {booking.time.toLocaleTimeString([], {
					hour: '2-digit',
					minute: '2-digit',
				})} */}
				20:10
			</td>
			<td>{booking.name}</td>
			<td>{booking.guests}</td>
			<td>{booking.table}</td>
		</tr>
	)
}

function BookingList() {
	const bookings = [
		{
			date: new Date(),
			time: new Date(),
			name: 'Jérémie',
			guests: 2,
			table: 32,
		},
		{
			date: new Date(),
			time: new Date(),
			name: 'Léon',
			guests: 2,
			table: 48,
		},
	]
	return (
		<table style={{ maxWidth: '30rem' }}>
			<tr>
				<th style={{ textAlign: 'left', fontSize: '1.125rem' }}>
					Time
				</th>
				<th style={{ textAlign: 'left', fontSize: '1.125rem' }}>
					Name
				</th>
				<th style={{ textAlign: 'left', fontSize: '1.125rem' }}>
					Guests
				</th>
				<th style={{ textAlign: 'left', fontSize: '1.125rem' }}>
					Table
				</th>
			</tr>
			{bookings.map((booking, index) => (
				<BookingCard key={index} booking={booking} />
			))}
		</table>
	)
}

function Timeline() {
	const tableNumber = 10
	const bookings = [
		{
			date: new Date(),
			time: '20:15',
			name: 'Jérémie',
			guests: 2,
			table: 32,
		},
	]
	return (
		<div style={{ overflow: 'scroll' }}>
			<div
				style={{
					display: 'flex',
					width: 'fit-content',
				}}
			>
				<div
					style={{
						flexShrink: 0,
						display: 'flex',
						alignItems: 'center',
						width: '3rem',
						height: '2rem',
						position: 'sticky',
						left: 0,
						background: 'white',
						zIndex: 1,
					}}
				>
					Table
				</div>
				{[...Array(24).keys()].map((hour) =>
					[...Array(4).keys()].map((quarter) => (
						<div
							key={hour + '' + quarter}
							style={{
								width: '5rem',
								height: '2rem',
								flexShrink: 0,
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<span style={{ transform: 'translateX(-50%)' }}>
								{quarter % 4 === 0 && hour + ':00'}
							</span>
						</div>
					)),
				)}
			</div>
			{[...Array(tableNumber).keys()].map((table) => (
				<div
					key={table}
					style={{
						display: 'flex',
						width: 'fit-content',
					}}
				>
					<div
						style={{
							flexShrink: 0,
							display: 'flex',
							alignItems: 'center',
							width: '3rem',
							height: '3rem',
							position: 'sticky',
							left: 0,
							background: 'white',
							zIndex: 2,
						}}
					>
						{table + 1}
					</div>
					{[...Array(24).keys()].map((hour) =>
						[...Array(4).keys()].map((quarter) => (
							<div
								key={hour + '' + quarter}
								style={{
									width: '5rem',
									height: '3rem',
									borderLeft:
										quarter % 4 === 0
											? '1px solid #eee'
											: '',
									flexShrink: 0,
									position: 'relative',
								}}
							>
								{table === 3 && hour === 4 && quarter == 0 && (
									<div
										style={{
											position: 'absolute',
											left: 4,
											top: 0,
											background: '#eee',
											borderRadius: '0.5rem',
											height: '3rem',
											width: '30rem',
											padding: '1rem',
											fontSize: '1.125rem',
											display: 'flex',
											alignItems: 'center',
											zIndex: 1,
										}}
									>
										Jérémie Amstutz
									</div>
								)}
								{table === 6 && hour === 5 && quarter == 3 && (
									<div
										style={{
											position: 'absolute',
											left: 4,
											top: 0,
											background: '#eee',
											borderRadius: '0.5rem',
											height: '3rem',
											width: '30rem',
											padding: '1rem',
											fontSize: '1.125rem',
											display: 'flex',
											alignItems: 'center',
											zIndex: 1,
										}}
									>
										Jérémie Amstutz
									</div>
								)}
							</div>
						)),
					)}
				</div>
			))}
		</div>
	)
}

export default function RestaurantBookingsPage() {
	return (
		<>
			<Container>
				<Header />
				<Main>
					<h1>Bookings</h1>
					<Timeline />
					{/* <BookingList /> */}
					{/* <div
						style={{
							// background: '#eee',
							// padding: '0.5rem 1rem',
							borderRadius: '0.5rem',
							maxWidth: '20rem',
							display: 'flex',
							// alignItems: 'center',
							gap: '1rem',
						}}
					>
						<div
							style={{
								border: '5px solid #00aa00',
								borderRadius: '50%',
								width: '2.25rem',
								height: '2.25rem',
							}}
						/>
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: '0.125rem',
							}}
						>
							<div
								style={{
									fontSize: '1.5rem',
									margin: '0.25rem 0',
								}}
							>
								Jérémie
							</div>
							<div style={{ fontSize: '1rem' }}>
								20:15 . 2 personnes
							</div>
						</div>
					</div> */}
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}
