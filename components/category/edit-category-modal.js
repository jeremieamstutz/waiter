import { useTranslation } from 'next-i18next'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'
import { mutate } from 'swr'

import { useRestaurant } from 'contexts/restaurant'

import Modal from 'components/ui/modal'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Textarea from 'components/form/textarea'

import axios from 'axios'
import { useState } from 'react'

export default function CategoryModal({ category, onClose }) {
	const { t } = useTranslation()
	const { restaurant } = useRestaurant()

	const formId = 'category'

	const handleDeleteCategory = async () => {
		await axios.delete(`/api/categories/${category.id}`)
		setShowConfirmDelete(false)
		await mutate(`/api/restaurants/${restaurant.id}`)
		onClose()
	}

	const [showConfirmDelete, setShowConfirmDelete] = useState(false)

	console.log(restaurant.categories.length)

	return (
		<>
			<Formik
				initialValues={{
					name: category?.name || '',
					description: category?.description || '',
					position:
						category?.position || restaurant.categories.length + 1,
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
				})}
				onSubmit={async (values) => {
					if (!category) {
						await axios.post('/api/categories', {
							category: {
								...values,
								restaurantId: restaurant.id,
							},
						})
					} else {
						await axios.put(`/api/categories/${category.id}`, {
							category: values,
						})
					}
					await mutate(`/api/restaurants/${restaurant.id}`)
					onClose()
				}}
			>
				{({ isSubmitting }) => (
					<Modal
						title={
							category
								? t('category:modals.edit.title')
								: t('category:modals.new.title')
						}
						onClose={onClose}
						footer={
							<>
								{showConfirmDelete && (
									<Modal
										title={t(
											'category:modals.delete.title',
										)}
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
													onClick={
														handleDeleteCategory
													}
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
											{t(
												'category:modals.delete.confirm',
											)}
											<span
												style={{
													color: '#222',
													fontStyle: 'italic',
												}}
											>
												{category.name}
											</span>{' '}
											?
										</p>
									</Modal>
								)}
								{category && (
									<button
										className="danger"
										onClick={() =>
											setShowConfirmDelete(true)
										}
									>
										{t('common:misc.actions.delete')}
									</button>
								)}
								<button
									type="submit"
									form={formId}
									className="secondary"
									style={{ flex: 1 }}
								>
									{isSubmitting
										? t('common:misc.actions.loading')
										: category
										? t('common:misc.actions.update')
										: t('common:misc.actions.create')}
								</button>
							</>
						}
					>
						<Form id={formId}>
							<Input
								label="Name"
								name="name"
								type="text"
								placeholder="Name"
								arial-label="Name"
								autoComplete="off"
							/>
							<Textarea
								label="Description"
								name="description"
								placeholder="Description"
								arial-label="Description"
								rows={3}
							/>
							<Select label="Position" name="position">
								{[
									...Array(
										category
											? restaurant.categories.length
											: restaurant.categories.length + 1,
									).keys(),
								].map((number) => (
									<option value={number + 1} key={number}>
										{number + 1}
									</option>
								))}
							</Select>
						</Form>
					</Modal>
				)}
			</Formik>
		</>
	)
}
