import Container from 'components/layout/container'
import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getRestaurant } from 'pages/api/restaurants/[restaurantId]'
import { parseAddress } from 'utils/geocoder'

export default function EditRestaurantPage({ restaurant }) {
	const router = useRouter()
	return (
		<>
			<Container>
				<Header />
				<Main
					style={{
						maxWidth: '60rem',
						margin: '0 auto',
					}}
				>
					<div
						style={{
							display: 'flex',
							gap: '1.5rem',
						}}
					>
						<div style={{ flex: 1 }}>
							<h1>{restaurant.name}</h1>
							<div
								style={{
									display: 'flex',
									gap: '1rem',
									flexDirection: 'column',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginTop: '1rem',
									}}
								>
									<h2>Images</h2>
								</div>
								<div
									style={{
										display: 'flex',
										gap: '1rem',
									}}
								>
									<Image src="/" width={400} height={300} />
									<Image src="/" width={400} height={300} />
									<Image src="/" width={400} height={300} />
								</div>
								<button>Show all</button>
							</div>
							<div
								style={{
									display: 'flex',
									gap: '1rem',
									flexDirection: 'column',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginTop: '2rem',
									}}
								>
									<h2>Details</h2>
								</div>
								<div style={{ display: 'flex', gap: '1rem' }}>
									<label style={{ flex: 1 }}>
										Name
										<input type="text" />
									</label>
									<label style={{ flex: 1 }}>
										Custom link
										<div
											style={{
												background: '#eee',
												borderRadius: '0.5rem',
												display: 'flex',
												alignItems: 'center',
												padding: '0 1rem',
												fontFamily: 'Rubik',
												fontSize: '1.125rem',
												gap: '0.25rem',
												color: '#666',
											}}
										>
											waiter.so/r/
											<input
												type="text"
												style={{
													outline: 'none',
													padding: 0,
												}}
											/>
										</div>
									</label>
								</div>
								<label>
									Description
									<textarea
										style={{ height: '10rem' }}
									></textarea>
								</label>
								{/* 
				cuisine: restaurant?.cuisine || '',
				phone: restaurant?.phone || '',
				website: restaurant?.website || '',
				street: restaurant?.street || '',
				streetNumber: restaurant?.streetNumber || '',
				postalCode: restaurant?.postalCode || '',
				city: restaurant?.city || '',
				region: restaurant?.region || '',
				country: restaurant?.country || '', */}
							</div>
							<div
								style={{
									display: 'flex',
									gap: '1rem',
									flexDirection: 'column',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginTop: '2rem',
									}}
								>
									<h2>Location</h2>
								</div>
								<div style={{ display: 'flex', gap: '1.5rem' }}>
									<div
										style={{
											flex: 1,
											display: 'flex',
											gap: '1rem',
											flexDirection: 'column',
										}}
									>
										<button
											onClick={() => {
												if (navigator.geolocation) {
													navigator.geolocation.getCurrentPosition(
														(position) => {
															console.log(
																position,
															)
															fetch(
																`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
															)
																.then((res) =>
																	res.json(),
																)
																.then(
																	(data) => {
																		console.log(
																			parseAddress(
																				data
																					.results[0],
																			),
																		)
																	},
																)
														},
													)
												}
											}}
										>
											Use my current location
										</button>
										<div
											style={{
												display: 'flex',
												gap: '1rem',
											}}
										>
											<label style={{ flex: 3 }}>
												Street
												<input type="text" />
											</label>
											<label style={{ flex: 1 }}>
												Number
												<input type="number" />
											</label>
										</div>
										<div
											style={{
												display: 'flex',
												gap: '1rem',
											}}
										>
											<label style={{ flex: 1 }}>
												ZIP
												<input type="number" />
											</label>
											<label style={{ flex: 3 }}>
												City
												<input type="text" />
											</label>
										</div>
										<div
											style={{
												display: 'flex',
												gap: '1rem',
											}}
										>
											<label style={{ flex: 1 }}>
												State
												<input type="text" />
											</label>
											<label style={{ flex: 1 }}>
												Country
												<select>
													<option>Switzerland</option>
												</select>
											</label>
										</div>
										{/* <img
											src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
											width={500}
											height={270}
										/> */}
									</div>
								</div>
							</div>
							<div
								style={{
									display: 'flex',
									gap: '1rem',
									flexDirection: 'column',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginTop: '2rem',
									}}
								>
									<h2>Contact</h2>
								</div>
								<div style={{ display: 'flex', gap: '1rem' }}>
									<label style={{ flex: 1 }}>
										Phone
										<input type="phone" />
									</label>
									<label style={{ flex: 1 }}>
										Website
										<input type="text" />
									</label>
									<label style={{ flex: 1 }}>
										Email
										<input type="email" />
									</label>
								</div>
							</div>
							{/* <div
								style={{
									display: 'flex',
									gap: '1rem',
									flexDirection: 'column',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginTop: '2rem',
									}}
								>
									<h2>Schedule</h2>
								</div>
							</div> */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: '1rem',
									margin: '2rem 0',
									// paddingTop: '2rem',
									// borderTop: '1px solid #ccc',
								}}
							>
								<button style={{ width: '10rem' }}>
									Cancel
								</button>
								<button
									className="secondary"
									style={{ width: '10rem' }}
								>
									Update
								</button>
							</div>
						</div>
						{/* <div>
							<div
								style={{
									display: 'flex',
									gap: '1rem',
									flexDirection: 'column',
									position: 'sticky',
									top: '2rem',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										marginTop: '1rem',
									}}
								>
									<h2>Photos</h2>
									<Link
										href={{
											pathname:
												router.pathname + '/images',
											query: router.query,
										}}
									>
										<a className="button">Edit</a>
									</Link>
								</div>
								<Image src="/" width={400} height={300} />
								<div
									style={{
										display: 'flex',
										// flexDirection: 'column',
										// gridTemplateColumns: '1fr 1fr',
										gap: '1rem',
									}}
								>
									<Image src="/" width={150} height={110} />
									<Image src="/" width={150} height={110} />
									<Image src="/" width={150} height={110} />
								</div>
							</div>
						</div> */}
						{/* <div
							style={{
								width: '30rem',
								height: '80vh',
								// background: '#eee',
								padding: '2rem',
								borderRadius: '1rem',
							}}
						></div> */}
					</div>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ params, locale }) {
	const { restaurantSlug } = params
	const restaurant = await getRestaurant({ restaurantSlug })

	return {
		props: {
			restaurant: JSON.parse(JSON.stringify(restaurant)),
			...(await serverSideTranslations(locale, ['common', 'restaurant'])),
		},
	}
}
