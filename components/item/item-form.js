import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import axios from 'axios'

import { Input, Textarea, Select } from 'components/ui/form-items'
import ImagePicker from 'components/ui/image-picker'

import classes from './item-form.module.css'
import sleep from 'utils/sleep'

export default function ItemForm({ restaurant, item }) {
	const router = useRouter()

	return (
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
				available: Yup.boolean('Not a boolean').required(
					'Availability is required',
				),
				currency: Yup.string().required('Currency is required'),
			})}
			onSubmit={async (values) => {
				if (!item) {
					await axios.post('/api/items', {
						item: {
							...values,
							categoryId: router.query.categoryId,
							restaurantId: restaurant.id,
						},
					})
				} else {
					await axios.put(`/api/items/${item.id}`, {
						item: values,
					})
				}
				// await sleep(2000)
				router.push({
					pathname: '/[restaurantSlug]',
					query: {
						restaurantSlug: router.query.restaurantSlug,
					},
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
						aria-label="Name"
						autoComplete="off"
					/>
					<Textarea
						name="description"
						placeholder="Description"
						aria-label="Description"
						rows={3}
					/>
					<Input
						name="price"
						type="number"
						placeholder="0.00"
						aria-label="Price"
						min={0}
						max={1000}
						step={0.05}
						autoComplete="off"
					/>
					<Select name="available" arial-label="Available">
						<option value="true">Available</option>
						<option value="false">Unavailable</option>
					</Select>
					{/* <label>
					<select>
						<option value={category.slug}>Beef burgers</option>
					</select>
				</label> */}
					<button type="submit" className="secondary">
						{isSubmitting
							? 'Loading....'
							: item
							? 'Update'
							: 'Save'}
					</button>
				</Form>
			)}
		</Formik>
	)
}
