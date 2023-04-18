import { useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { mutate } from 'swr'
import { array, number, object, string } from 'yup'
import axios from 'axios'

import { useRestaurant } from 'contexts/restaurant'

import Modal from 'components/ui/modal'
import EditRestaurantForm from './edit-restaurant-form'

import classes from './edit-restaurant-modal.module.css'
import { Formik } from 'formik'

export default function EditRestaurantModal({ onClose }) {
	const { t } = useTranslation()

	const { restaurant } = useRestaurant()

	const swiperRef = useRef(null)

	const [prevEl, setPrevEl] = useState(null)
	const [nextEl, setNextEl] = useState(null)
	const [pagEl, setPagEl] = useState(null)

	return (
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
					await axios.put(`/api/restaurants/${restaurant.id}`, values)
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
								form="edit-restaurant"
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
					<EditRestaurantForm />
				</Modal>
			)}
		</Formik>
	)
}
