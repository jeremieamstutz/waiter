import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

import { Input, Textarea } from 'components/ui/form-items'

import classes from './category-form.module.css'
import sleep from 'utils/sleep'
import axios from 'axios'

export default function CategoryForm({ category }) {
	const router = useRouter()

	return (
		<Formik
			initialValues={{
				name: category?.name || '',
				description: category?.description || '',
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less')
					.required('Name is required'),
				description: Yup.string().max(
					500,
					'Must be 500 characters or less',
				),
			})}
			onSubmit={async (values) => {
				if (!category) {
					await axios.post('/api/categories', {
						category: values,
						citySlug: router.query.citySlug,
						restaurantSlug: router.query.restaurantSlug,
					})
				} else {
					await axios.put(`/api/categories/${category.id}`, values)
				}
				router.push({
					pathname: '/[citySlug]/[restaurantSlug]',
					query: {
						citySlug: router.query.citySlug,
						restaurantSlug: router.query.restaurantSlug,
					},
				})
			}}
		>
			{({ isSubmitting }) => (
				<Form className={classes.form}>
					<Input
						name="name"
						type="text"
						placeholder="Name"
						autoComplete="off"
					/>
					<Textarea
						name="description"
						placeholder="Description"
						rows={3}
					/>
					<button type="submit" className="secondary">
						{isSubmitting
							? 'Loading....'
							: category
							? 'Update'
							: 'Save'}
					</button>
				</Form>
			)}
		</Formik>
	)
}
