import { useId, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Form, Formik } from 'formik'
import { array, number, object, string } from 'yup'
import { mutate } from 'swr'
import axios from 'axios'

import CUISINES from 'constants/cuisines'
import { capitalizeFirstLetter } from 'utils/text'

import Modal from 'components/ui/modal'
import ImagePicker from 'components/ui/image-picker'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Textarea from 'components/form/textarea'

import At from 'components/icons/at'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import Plus from 'components/icons/plus'
import { parseAddress } from 'utils/geocoder'

export default function EditRestaurantModal({ restaurant, onClose }) {
	const { t } = useTranslation()

	const formId = useId()
	const swiperRef = useRef(null)

	const [prevEl, setPrevEl] = useState(null)
	const [nextEl, setNextEl] = useState(null)
	const [pagEl, setPagEl] = useState(null)

	const [autofillLoading, setAutofillLoading] = useState(false)

	return (
		<>
			<Formik
				initialValues={{
					photos: restaurant?.image || [],
					name: restaurant?.name || '',
					description: restaurant?.description || '',
					cuisine: restaurant?.cuisine || '',
					phone: restaurant?.phone || '',
					website: restaurant?.website || '',
					street: restaurant?.street || '',
					streetNumber: restaurant?.streetNumber || '',
					postalCode: restaurant?.postalCode || '',
					city: restaurant?.city || '',
					region: restaurant?.region || '',
					country: restaurant?.country || '',
				}}
				validationSchema={object({
					photos: array(string().required('You must add 5 images'))
						.min(5)
						.max(20),
					name: string()
						.min(3, 'Must be 3 characters or more')
						.max(30, 'Must be 30 characters or less')
						.required('Name is required'),
					description: string().max(
						500,
						'Must be 500 characters or less',
					),
					cuisine: string()
						.min(3, 'Must be 3 characters or more')
						.max(30, 'Must be 30 characters or less')
						.required('Cuisine is required'),
					phone: string().min(8, 'Must be 8 characters or more'),
					website: string().url(),
					street: string()
						.min(3, 'Must be 3 characters or more')
						.max(30, 'Must be 30 characters or less')
						.required('Street is required'),
					streetNumber: number()
						.positive('Must be positive')
						.integer('Must be an integer')
						.required('Number is required'),
					postalCode: number()
						.positive('Must be positive')
						.integer('Must be an integer')
						.required('Postal code is required'),
					city: string()
						.min(3, 'Must be 3 characters or more')
						.max(30, 'Must be 30 characters or less')
						.required('City is required'),
					region: string()
						.min(3, 'Must be 3 characters or more')
						.max(30, 'Must be 30 characters or less')
						.required('Region is required'),
					country: string()
						.min(3, 'Must be 3 characters or more')
						.max(30, 'Must be 30 characters or less')
						.required('Country is required'),
				})}
				onSubmit={async (values) => {
					let response
					if (!restaurant) {
						response = await axios.post('/api/restaurants', {
							restaurant: {
								...values,
							},
						})
					} else {
						response = await axios.put(
							`/api/restaurants/${restaurant.id}`,
							{
								restaurant: {
									...values,
								},
							},
						)
					}
					// await sleep(2000)
					const data = response.data
					router.push({
						pathname: '/restaurants/[restaurantSlug]',
						query: {
							restaurantSlug: data.restaurant.slug,
						},
					})
				}}
			>
				{({ values, setFieldValue, isSubmitting }) => (
					<Modal
						title={
							restaurant
								? t('restaurant:modals.edit.title')
								: t('restaurant:modals.new.title')
						}
						onClose={onClose}
						footer={
							<>
								<button type="button">Cancel</button>
								<button
									type="submit"
									form={formId}
									className="secondary"
								>
									{isSubmitting
										? t('common:misc.actions.loading')
										: restaurant
										? t('common:misc.actions.update')
										: t('common:misc.actions.create')}
								</button>
							</>
						}
						style={{ maxWidth: '50rem' }}
					>
						<Form id={formId}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'end',
									gap: '1rem',
								}}
							>
								<h2>Photos</h2>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<button type="button">Grid view</button>
									<div
										style={{
											display: 'flex',
											gap: '0.5rem',
											alignItems: 'center',
										}}
									>
										<button
											type="button"
											ref={(node) => setPrevEl(node)}
											style={{
												minWidth: 0,
												padding: 0,
												width: '2.5rem',
												height: '2.5rem',
												borderRadius: '50%',
												marginLeft: '1rem',
											}}
											aria-label="Previous image"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
										<div
											ref={(node) => setPagEl(node)}
											style={{ width: 'auto' }}
										/>
										<button
											type="button"
											ref={(node) => setNextEl(node)}
											style={{
												minWidth: 0,
												padding: 0,
												width: '2.5rem',
												height: '2.5rem',
												borderRadius: '50%',
											}}
											aria-label="Next image"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
							<div style={{ display: 'flex', gap: '0.5rem' }}>
								<Swiper
									ref={swiperRef}
									modules={[Navigation, Pagination]}
									loop={false}
									navigation={{
										prevEl,
										nextEl,
									}}
									slidesPerView="2"
									spaceBetween={7}
									threshold={4}
									pagination={{
										el: pagEl,
										type: 'fraction',
									}}
									style={{ borderRadius: '0.5rem' }}
									onSlidesLengthChange={(swiper) =>
										swiper.slideTo(swiper.slides.length)
									}
								>
									{values.photos.map((photo, index) => (
										<SwiperSlide key={index}>
											<div
												style={{
													flexShrink: 0,
													background: '#ccc',
													borderRadius: '0.5rem',
													aspectRatio: 4 / 3,
													width: 'auto',
													minWidth: '10rem',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												{index}
											</div>
										</SwiperSlide>
									))}
								</Swiper>
								<div
									style={{
										flex: 1,
										flexShrink: 0,
										background: '#eee',
										borderRadius: '0.5rem',
										alignSelf: 'stretch',
										minWidth: '50px',
										minHeight: '15rem',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										cursor: 'pointer',
									}}
									onClick={() => {
										setFieldValue('photos', [
											...values.photos,
											'',
										])
									}}
								>
									<Plus />
								</div>
							</div>
							{/* <div
								style={{
									display: 'flex',
									gap: '1rem',
									overflow: 'scroll',
									margin: '-1rem -1.5rem',
									padding: '1rem 1.5rem',
								}}
							>
								<div
									style={{
										flexShrink: 0,
										background: '#ccc',
										borderRadius: '0.5rem',
										aspectRatio: 4 / 3,
										width: '45%',
									}}
								/>
								<div
									style={{
										flexShrink: 0,
										background: '#ccc',
										borderRadius: '0.5rem',
										aspectRatio: 4 / 3,
										width: '45%',
									}}
								/>
								<ImagePicker
									style={{
										width: '45%',
										aspectRatio: 4 / 3,
										flexShrink: 0,
										overflow: 'visible',
									}}
								/>
							</div> */}
							<h2>Details</h2>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									label="Name"
									name="name"
									type="text"
									placeholder="Name"
									arial-label="Name"
								/>
								<Select
									label="Cuisine"
									name="cuisine"
									arial-label="Cuisine"
								>
									<option value="" disabled>
										Cuisine
									</option>
									{CUISINES.map((cuisine, index) => (
										<option value={cuisine} key={index}>
											{capitalizeFirstLetter(cuisine)}
										</option>
									))}
								</Select>
							</div>
							<Textarea
								label="Description"
								name="description"
								placeholder="Description"
								arial-label="Description"
								rows={3}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'end',
								}}
							>
								<h2>Location</h2>
								<button
									type="button"
									className="text"
									style={{ fontFamily: 'Rubik' }}
									onClick={() => {
										if (navigator.geolocation) {
											setAutofillLoading(true)
											navigator.geolocation.getCurrentPosition(
												(position) => {
													console.log(position)
													fetch(
														`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
													)
														.then((res) =>
															res.json(),
														)
														.then((data) => {
															const address =
																parseAddress(
																	data
																		.results[0],
																)
															console.log(address)
															setFieldValue(
																'street',
																address.street,
															)
															setFieldValue(
																'streetNumber',
																address.streetNumber,
															)
															setFieldValue(
																'postalCode',
																address.postalCode,
															)
															setFieldValue(
																'city',
																address.city,
															)
															setFieldValue(
																'region',
																address.state,
															)
															setFieldValue(
																'country',
																address.country,
															)
															setAutofillLoading(
																false,
															)
														})
												},
											)
										}
									}}
								>
									{!autofillLoading
										? 'Use current location'
										: 'Loading...'}
								</button>
							</div>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									label="Street"
									name="street"
									type="text"
									placeholder="Street"
									arial-label="Street"
									style={{ flex: 2 }}
								/>
								<Input
									label="Number"
									name="streetNumber"
									type="number"
									placeholder="12"
									arial-label="Street's number"
								/>
							</div>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									label="Zip"
									name="postalCode"
									type="number"
									placeholder="1234"
									arial-label="Postal code"
								/>
								<Input
									label="City"
									name="city"
									type="text"
									placeholder="City"
									arial-label="City"
									style={{ flex: 2 }}
								/>
							</div>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									label="Region"
									name="region"
									type="text"
									placeholder="Region"
									arial-label="Region"
								/>
								<Select
									label="Country"
									name="country"
									arial-label="Country"
								>
									<option value="" disabled>
										Country
									</option>
									<option value="Switzerland">Suisse</option>
								</Select>
							</div>
							<h2>Contact</h2>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									label="Phone"
									name="phone"
									type="text"
									placeholder="+41 12 345 67 89"
									arial-label="Phone"
								/>
								<Input
									label="Email"
									name="email"
									type="email"
									placeholder="email@provider.com"
									arial-label="Email"
								/>
							</div>
							<Input
								label="Website"
								name="website"
								type="url"
								placeholder="https://yourwebsite.com"
								arial-label="Website"
							/>
							{/* <div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									prefix={
										<At
											width={16}
											height={16}
											fill="#666"
										/>
									}
									label="Instagram"
									name="instagram"
									type="text"
									placeholder="username"
									arial-label="Instagram"
								/>
								<Input
									label="Facebook"
									name="facebook"
									type="text"
									placeholder="username"
									arial-label="Facebook"
								/>
							</div> */}
						</Form>
					</Modal>
				)}
			</Formik>
		</>
	)
}
