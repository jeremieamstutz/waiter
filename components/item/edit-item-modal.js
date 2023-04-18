import { useId, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Form, Formik } from 'formik'
import { number, object, string } from 'yup'
import axios from 'axios'
import { mutate } from 'swr'

import track from 'utils/track'
import sleep from 'utils/sleep'

import { useRestaurant } from 'contexts/restaurant'

import Modal from 'components/ui/modal'

import ImagePicker from 'components/form/image-picker'
import Textarea from 'components/form/textarea'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Tags from 'components/form/tags'

import classes from './item-modal.module.css'

const TAGS = ['vegan', 'vegetarian', 'bio', 'homemade', 'healthy']

const ALLERGIES = [
	'moluscs',
	'eggs',
	'fish',
	'lupin',
	'soya',
	'milk',
	'peanuts',
	'gluten',
	'crustaceans',
	'mustard',
	'nuts',
	'sesame',
	'celery',
	'sulphite',
]

export default function ItemModal({ item, onClose }) {
	const { restaurant } = useRestaurant()
	const router = useRouter()
	const { t } = useTranslation()
	const formId = useId()

	const handleDeleteItem = async () => {
		await axios.delete(`/api/items/${item.id}`)
		setShowConfirmDelete(false)
		await mutate(`/api/restaurants/${restaurant.id}`)
		track.event({
			event_category: 'item',
			event_name: 'delete_item',
			event_label: item.name,
		})
		onClose()
	}

	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

	return (
		<Formik
			initialValues={{
				image: item?.image ?? '',
				name: item?.name ?? '',
				description: item?.description ?? '',
				price: item?.price ?? '',
				currency: item?.currency ?? 'CHF',
				allergies: item?.allergies ?? [],
				tags: item?.tags ?? [],
				sequenceNumber: item?.sequenceNumber,
			}}
			validationSchema={object({
				image: string(),
				name: string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less')
					.required('Name is required'),
				description: string().max(
					500,
					'Must be 500 characters or less',
				),
				price: number('Must be a number')
					.positive('Must be a positive number')
					.required('Price is required'),
				currency: string().required('Currency is required'),
			})}
			onSubmit={async (values) => {
				if (!item) {
					await axios({
						method: 'POST',
						url: '/api/items',
						data: {
							...values,
							categoryId: router.query.categoryId,
							restaurantId: router.query.restaurantId,
						},
					})
					track.event({
						event_category: 'item',
						event_name: 'create_item',
						event_label: values.name,
					})
				} else {
					await axios({
						method: 'PUT',
						url: `/api/items/${item.id}`,
						data: values,
					})
					track.event({
						event_category: 'item',
						event_name: 'update_item',
						event_label: values.name,
					})
				}
				await mutate(`/api/restaurants/${restaurant.id}`)
				onClose()
			}}
		>
			{({ isSubmitting }) => (
				<Modal
					title={
						item
							? t('item:modals.edit.title')
							: t('item:modals.new.title')
					}
					onClose={onClose}
					footer={
						<>
							{showConfirmDelete && (
								<Modal
									title={t('item:modals.delete.title')}
									onClose={() => setShowConfirmDelete(false)}
									footer={
										<>
											<button
												onClick={() =>
													setShowConfirmDelete(false)
												}
											>
												{t(
													'common:misc.actions.cancel',
												)}
											</button>
											<button
												className="danger"
												onClick={handleDeleteItem}
											>
												{t(
													'common:misc.actions.delete',
												)}
											</button>
										</>
									}
									style={{
										maxWidth: '30rem',
									}}
								>
									<p>
										{t('item:modals.delete.confirm')}
										<span
											style={{
												color: '#222',
												fontStyle: 'italic',
											}}
										>
											{item.name}
										</span>{' '}
										?
									</p>
								</Modal>
							)}
							{item && (
								<button
									className="danger"
									onClick={() => setShowConfirmDelete(true)}
								>
									{t('common:misc.actions.delete')}
								</button>
							)}
							<button
								type="submit"
								form={formId}
								className="secondary"
								// style={{ flex: 1 }}
								style={{
									marginLeft: 'auto',
								}}
							>
								{isSubmitting
									? t('common:misc.actions.loading')
									: item
									? t('common:misc.actions.update')
									: t('common:misc.actions.create')}
							</button>
						</>
					}
				>
					<Form className={classes.form} id={formId}>
						<ImagePicker name="image" />
						<Input
							type="text"
							name="name"
							label={t('item:fields.name')}
							placeholder={t('item:fields.name')}
							autoComplete="off"
						/>
						<Textarea
							rows={4}
							name="description"
							label={t('item:fields.description')}
							placeholder={t('item:fields.description')}
						/>
						<Input
							type="number"
							name="price"
							label={t('item:fields.price')}
							style={{ flex: 1 }}
							suffix="CHF"
							placeholder="0.00"
							step="0.05"
							min="0"
						/>
						<Tags
							name="allergies"
							label={t('item:fields.allergies')}
						>
							{ALLERGIES.map((allergy) => (
								<Tags.Item value={allergy} key={allergy}>
									{t('item:allergies.' + allergy)}
								</Tags.Item>
							))}
						</Tags>
						<Tags name="tags" label={t('item:fields.tags')}>
							{TAGS.map((tag) => (
								<Tags.Item value={tag} key={tag}>
									{t('item:tags.' + tag)}
								</Tags.Item>
							))}
						</Tags>
						<Input
							name="position"
							type="number"
							label={t('item:fields.sequenceNumber')}
						/>
					</Form>
				</Modal>
			)}
		</Formik>
	)
}
