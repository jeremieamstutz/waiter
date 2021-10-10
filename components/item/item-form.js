import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'

import { Input, Textarea } from 'components/ui/form-items'
import ImagePicker from 'components/ui/image-picker'

import classes from './item-form.module.css'
import sleep from 'utils/sleep'
import axios from 'axios'

export default function ItemForm({ item }) {
	const router = useRouter()

	return (
		<Formik
			initialValues={{
				image: item?.image || '',
				name: item?.name || '',
				description: item?.description || '',
				price: item?.price || '',
				currency: item?.currency || 'CHF',
				category: item?.category || '',
			}}
			validationSchema={Yup.object({
				image: Yup.string().required('You must add an image'),
				name: Yup.string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less')
					.required('Name is required'),
				description: Yup.string().max(
					500,
					'Must be 500 characters or less',
				),
				price: Yup.number('Must be a number').required(
					'Price is required',
				),
				currency: Yup.string().required('Currency is required'),
			})}
			onSubmit={async (values) => {
				if (!item) {
					await axios.post('/api/items', {
						...values,
						category: router.query.category,
					})
				} else {
					await axios.put(`/api/items/${item.id}`, {
						...values,
						category: router.query.category,
					})
				}
				// await sleep(2000)
				router.push({
					pathname: '/[citySlug]/[restaurantSlug]',
					query: {
						citySlug: router.query.citySlug,
						restaurantSlug: router.query.restaurantSlug
					}
				})
			}}
		>
			{({ values, setFieldValue, isSubmitting }) => (
				<Form className={classes.form}>
					<ImagePicker
						url={values.image}
						setUrl={(url) => setFieldValue('image', url)}
					/>
					<ErrorMessage name="image" />
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
					<Input
						name="price"
						type="number"
						placeholder="0.00"
						min={0}
						max={1000}
						step={0.05}
						autoComplete="off"
					/>
					{/* <label>
					<select>
						<option value={category.slug}>Beef burgers</option>
					</select>
				</label> */}
					<div className={classes.actions}>
						<button type="submit" className="secondary">
							{isSubmitting
								? 'Loading....'
								: item
								? 'Update'
								: 'Save'}
						</button>
					</div>
				</Form>
			)}
		</Formik>
	)
}
