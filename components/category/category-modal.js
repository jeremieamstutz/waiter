import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'

import { useRestaurant } from 'contexts/restaurant'

import Modal from 'components/ui/modal'
import Input from 'components/form/input'
import Select from 'components/form/select'
import Textarea from 'components/form/textarea'

import classes from './category-form.module.css'

export default function CategoryModal({ category, onClose }) {
	const { t } = useTranslation()
	const { restaurant } = useRestaurant()

	const formId = 'category'

	return (
		<>
			<Formik
				initialValues={{
					name: category?.name || '',
					description: category?.description || '',
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
					// if (!category) {
					// 	await axios.post('/api/categories', {
					// 		category: {
					// 			...values,
					// 			restaurantId: restaurant.id,
					// 		},
					// 	})
					// } else {
					// 	await axios.put(`/api/categories/${category.id}`, {
					// 		category: values,
					// 	})
					// }
					onClose()
					console.log('SENT')
				}}
			>
				{({ isSubmitting }) => (
					<Modal
						title="Edit category"
						onClose={onClose}
						footer={
							<>
								<button className="danger">
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
										: category
										? t('common:misc.actions.update')
										: t('common:misc.actions.create')}
								</button>
							</>
						}
					>
						<Form className={classes.form} id={formId}>
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
											: restaurant.categories.length - 1,
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
