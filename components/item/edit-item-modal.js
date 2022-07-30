import { useId, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { Form, Formik } from 'formik'

import { useRestaurant } from 'contexts/restaurant'

import Modal from 'components/ui/modal'

import classes from './item-modal.module.css'
import Textarea from 'components/form/textarea'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Tags from 'components/form/tags'
import ImagePicker from 'components/ui/image-picker'

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
	const router = useRouter()
	const { t } = useTranslation()
	const formId = useId()

	const handleDeleteItem = async () => {
		await axios.delete(`/api/items/${item.id}`)
		router.push({
			pathname: '/restaurants/[restaurantSlug]',
			query: {
				restaurantSlug: router.query.restaurantSlug,
			},
		})
	}

	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

	return (
		<>
			<Formik
				initialValues={{
					image: item?.image || '',
					name: item?.name || '',
					description: item?.description || '',
					price: item?.price || '',
					available: item?.available.toString() || true,
					currency: item?.currency || 'CHF',
					categoryId: item?.categoryId || '',
				}}
			>
				{({ status, isSubmitting, values }) => (
					<Modal
						title="Edit item"
						onClose={onClose}
						footer={
							<>
								{showConfirmDelete && (
									<Modal
										title={t('item:modals.delete.title')}
										onClose={() =>
											setShowConfirmDelete(false)
										}
										footer={
											<>
												<button
													onClick={() =>
														setShowConfirmDelete(
															false,
														)
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
								<button
									className="danger"
									onClick={() => setShowConfirmDelete(true)}
								>
									{t('common:misc.actions.delete')}
								</button>
								<button
									type="submit"
									form={formId}
									className="secondary"
									style={{ flex: 1 }}
								>
									{isSubmitting
										? 'Loading....'
										: item
										? t('common:misc.actions.update')
										: t('common:misc.actions.create')}
								</button>
							</>
						}
					>
						<Form className={classes.form} id={formId}>
							<ImagePicker
								name="image"
								label="Image"
								url={values.image}
								style={{ height: '26rem' }}
							/>
							<Input
								type="text"
								name="name"
								label={t('item:fields.name')}
								placeholder={t('item:fields.name')}
								autoComplete="off"
							/>
							<Textarea
								rows={2}
								name="description"
								label={t('item:fields.description')}
								placeholder={t('item:fields.description')}
							/>
							<div style={{ display: 'flex', gap: '1rem' }}>
								<Input
									type="number"
									name="price"
									label={t('item:fields.price')}
									style={{ flex: 1 }}
									placeholder="0.00"
									step="0.01"
								/>
								<Select
									name="currency"
									label={t('item:fields.currency')}
									style={{ maxWidth: '10rem' }}
								>
									<option value="chf">CHF</option>
									<option value="eur">EUR</option>
									<option value="usd">USD</option>
								</Select>
							</div>
							<Tags
								name="allergies"
								label={t('item:fields.allergies')}
							>
								{ALLERGIES.map((allergy, index) => (
									<Tags.Item value={allergy} key={index}>
										{t('item:allergies.' + allergy)}
									</Tags.Item>
								))}
							</Tags>
							<Tags name="tags" label={t('item:fields.tags')}>
								{TAGS.map((tag, index) => (
									<Tags.Item value={tag} key={index}>
										{t('item:tags.' + tag)}
									</Tags.Item>
								))}
							</Tags>
						</Form>
					</Modal>
				)}
			</Formik>
		</>
	)
}
