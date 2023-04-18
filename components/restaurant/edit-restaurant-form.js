import Image from 'next/image'
import { Form, Formik, useFormikContext } from 'formik'

import { parseAddress } from 'utils/geocoder'

import CUISINES from 'constants/cuisines'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Textarea from 'components/form/textarea'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import classes from './edit-restaurant-modal.module.css'
import { useRestaurant } from 'contexts/restaurant'

function Images() {
	const router = useRouter()
	const { t } = useTranslation()
	const { restaurant } = useRestaurant()

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<div className={classes.images}>
				{Array.from({ ...restaurant.images, length: 3 }).map(
					(image, index) => (
						<Image
							key={index}
							alt={image?.alt ?? ''}
							src={image?.url ?? '/images/defaults/item.png'}
							width={400}
							height={300}
							sizes="640px"
							style={{
								display: 'block',
								width: '100%',
								height: 'auto',
								aspectRatio: 4 / 3,
								borderRadius: '0.5rem',
							}}
						/>
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

export default function EditRestaurantForm() {
	const { t } = useTranslation()

	const [autofillLoading, setAutofillLoading] = useState(false)
	return (
		<Form id="edit-restaurant">
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
					arial-label={t('restaurant:fields.name.label')}
					placeholder={t('restaurant:fields.name.label')}
				/>
				<Select
					name="cuisine"
					label={t('restaurant:fields.cuisine.label')}
					arial-label={t('restaurant:fields.name.label')}
				>
					<option value="" disabled>
						Cuisine
					</option>
					{CUISINES.map((cuisine) => (
						<option value={cuisine} key={cuisine}>
							{t('restaurant:cuisines.' + cuisine)}
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
										.then((res) => res.json())
										.then((data) => {
											const address = parseAddress(
												data.results[0],
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
											setFieldValue('city', address.city)
											setFieldValue(
												'region',
												address.state,
											)
											setFieldValue(
												'country',
												address.country,
											)
											setAutofillLoading(false)
										})
								},
							)
						}
					}}
				>
					{!autofillLoading ? 'Use current location' : 'Loading...'}
				</button>
			</div>
			<div style={{ display: 'flex', gap: '1rem' }}>
				<Input
					type="text"
					name="street"
					label={t('restaurant:fields.street.label')}
					arial-label={t('restaurant:fields.street.label')}
					placeholder={t('restaurant:fields.street.label')}
					style={{ flex: 2 }}
				/>
				<Input
					type="number"
					name="streetNumber"
					label={t('restaurant:fields.streetNumber.label')}
					arial-label={t('restaurant:fields.streetNumber.label')}
					placeholder="12"
				/>
			</div>
			<div style={{ display: 'flex', gap: '1rem' }}>
				<Input
					type="number"
					name="postalCode"
					label={t('restaurant:fields.zip.label')}
					arial-label={t('restaurant:fields.zip.label')}
					placeholder="1234"
				/>
				<Input
					type="text"
					name="city"
					label={t('restaurant:fields.city.label')}
					arial-label={t('restaurant:fields.city.label')}
					placeholder={t('restaurant:fields.city.label')}
					style={{ flex: 2 }}
				/>
			</div>
			<div style={{ display: 'flex', gap: '1rem' }}>
				<Input
					type="text"
					name="region"
					label={t('restaurant:fields.region.label')}
					arial-label={t('restaurant:fields.region.label')}
					placeholder={t('restaurant:fields.region.label')}
				/>
				<Select
					name="country"
					label={t('restaurant:fields.country.label')}
					arial-label={t('restaurant:fields.country.label')}
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
					arial-label={t('restaurant:fields.phone.label')}
					placeholder="+41 12 345 67 89"
				/>
				<Input
					type="email"
					name="email"
					label={t('restaurant:fields.email.label')}
					arial-label={t('restaurant:fields.email.label')}
					placeholder="email@provider.com"
				/>
			</div>
			<Input
				type="url"
				name="website"
				label={t('restaurant:fields.website.label')}
				arial-label={t('restaurant:fields.website.label')}
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
	)
}
