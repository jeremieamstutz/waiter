import { useId, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Form, Formik, useFormikContext } from 'formik'
import { array, number, object, string } from 'yup'
import axios from 'axios'

import { parseAddress } from 'utils/geocoder'

import CUISINES from 'constants/cuisines'

import Modal from 'components/ui/modal'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Textarea from 'components/form/textarea'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { useRouter } from 'next/router'
import { useRestaurant } from 'contexts/restaurant'
import { mutate } from 'swr'

function ImagePreview({ image }) {
	return (
		<div
			style={{
				background: '#eee',
				aspectRatio: 4 / 3,
				borderRadius: '0.5rem',
				position: 'relative',
			}}
		>
			<Image
				alt={image?.alt ?? ''}
				src={image?.url ?? '/images/defaults/item.png'}
				layout="responsive"
				objectFit="cover"
				width={400}
				height={300}
				sizes="640px"
			/>
		</div>
	)
}

function Images() {
	const router = useRouter()
	const { t } = useTranslation()
	const { restaurant } = useRestaurant()

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<div
				style={{
					display: 'grid',
					gap: '1rem',
					gridTemplateColumns: 'repeat(3, 1fr)',
				}}
			>
				{Array.from({ ...restaurant.images, length: 3 }).map(
					(image, index) => (
						<ImagePreview key={index} image={image} index={index} />
					),
				)}
			</div>
			<button
				type="button"
				onClick={() =>
					router.push(
						{
							pathname: router.pathname,
							query: {
								restaurantSlug: router.query.restaurantSlug,
								editRestaurantImages: true,
							},
						},
						undefined,
						{ shallow: true },
					)
				}
			>
				{t('restaurant:actions.editImages')}
			</button>
		</div>
	)
}

export default function EditRestaurantModal({ onClose }) {
	const { t } = useTranslation()

	const { restaurant } = useRestaurant()

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
					name: restaurant?.name || '',
					description: restaurant?.description || '',
					cuisine: restaurant?.cuisine || '',
					phone: restaurant?.phone || '',
					email: restaurant?.email || '',
					website: restaurant?.website || '',
					street: restaurant?.street || '',
					streetNumber: restaurant?.streetNumber || '',
					postalCode: restaurant?.postalCode || '',
					city: restaurant?.city || '',
					region: restaurant?.region || '',
					country: restaurant?.country || '',
				}}
				validationSchema={object({
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
					email: string().email('Must be a valid email'),
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
					console.log('SUBMITTTING', values)
					let response
					if (!restaurant) {
						await axios.post('/api/restaurants', values)
					} else {
						await axios.put(
							`/api/restaurants/${restaurant.id}`,
							values,
						)
					}
					await mutate(`/api/restaurants/${restaurant.id}`)
					onClose()
				}}
			>
				{({ values, dirty, setFieldValue, isSubmitting }) => (
					<Modal
						title={
							restaurant
								? t('restaurant:modals.editRestaurant.title')
								: t('restaurant:modals.newRestaurant.title')
						}
						onClose={() => {
							if (!dirty) return onClose()
							if (confirm('Are you sure ?')) return onClose()
						}}
						footer={
							<>
								<button
									type="button"
									onClick={() => {
										if (!dirty) return onClose()
										if (confirm('Are you sure ?'))
											return onClose()
									}}
								>
									{t('common:misc.actions.cancel')}
								</button>
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
							<h2 style={{ marginBottom: 0 }}>
								{t('restaurant:categories.images')}
							</h2>
							<Images />
							<h2>{t('restaurant:categories.details')}</h2>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									type="text"
									name="name"
									label={t('restaurant:fields.name.label')}
									arial-label={t(
										'restaurant:fields.name.label',
									)}
									placeholder={t(
										'restaurant:fields.name.label',
									)}
								/>
								<Select
									name="cuisine"
									label={t('restaurant:fields.cuisine.label')}
									arial-label={t(
										'restaurant:fields.name.label',
									)}
								>
									<option value="" disabled>
										Cuisine
									</option>
									{CUISINES.map((cuisine) => (
										<option value={cuisine} key={cuisine}>
											{t(
												'restaurant:cuisines.' +
													cuisine,
											)}
										</option>
									))}
								</Select>
							</div>
							<Textarea
								name="description"
								label={t('restaurant:fields.description.label')}
								arial-label={t('restaurant:fields.name.label')}
								placeholder={t('restaurant:fields.name.label')}
								rows={3}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<h2>{t('restaurant:categories.location')}</h2>
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
									type="text"
									name="street"
									label={t('restaurant:fields.street.label')}
									arial-label={t(
										'restaurant:fields.street.label',
									)}
									placeholder={t(
										'restaurant:fields.street.label',
									)}
									style={{ flex: 2 }}
								/>
								<Input
									type="number"
									name="streetNumber"
									label={t(
										'restaurant:fields.streetNumber.label',
									)}
									arial-label={t(
										'restaurant:fields.streetNumber.label',
									)}
									placeholder="12"
								/>
							</div>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									type="number"
									name="postalCode"
									label={t('restaurant:fields.zip.label')}
									arial-label={t(
										'restaurant:fields.zip.label',
									)}
									placeholder="1234"
								/>
								<Input
									type="text"
									name="city"
									label={t('restaurant:fields.city.label')}
									arial-label={t(
										'restaurant:fields.city.label',
									)}
									placeholder={t(
										'restaurant:fields.city.label',
									)}
									style={{ flex: 2 }}
								/>
							</div>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									type="text"
									name="region"
									label={t('restaurant:fields.region.label')}
									arial-label={t(
										'restaurant:fields.region.label',
									)}
									placeholder={t(
										'restaurant:fields.region.label',
									)}
								/>
								<Select
									name="country"
									label={t('restaurant:fields.country.label')}
									arial-label={t(
										'restaurant:fields.country.label',
									)}
								>
									<option value="" disabled>
										{t('restaurant:fields.country.label')}
									</option>
									<option value="Switzerland">Suisse</option>
								</Select>
							</div>
							<h2>{t('restaurant:categories.contact')}</h2>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									type="text"
									name="phone"
									label={t('restaurant:fields.phone.label')}
									arial-label={t(
										'restaurant:fields.phone.label',
									)}
									placeholder="+41 12 345 67 89"
								/>
								<Input
									type="email"
									name="email"
									label={t('restaurant:fields.email.label')}
									arial-label={t(
										'restaurant:fields.email.label',
									)}
									placeholder="email@provider.com"
								/>
							</div>
							<Input
								type="url"
								name="website"
								label={t('restaurant:fields.website.label')}
								arial-label={t(
									'restaurant:fields.website.label',
								)}
								placeholder="https://yourwebsite.com"
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
