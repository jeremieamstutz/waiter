import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Textarea } from 'components/ui/form-items'
import ImagePicker from 'components/ui/image-picker'

import classes from './user-form.module.css'

export default function UserForm({ user }) {
	return (
		<Formik
			initialValues={{
				image: user?.image || '',
				name: user?.name || '',
				description: user?.description || '',
				price: user?.price || '',
				currency: user?.currency || 'CHF',
				category: user?.category || '',
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
				if (!user) {
					await axios.post('/api/users', {
						user: {
							...values,
							category: router.query.category,
						},
						restaurantSlug: router.query.restaurantSlug,
					})
				} else {
					await axios.put(`/api/users/${user.id}`, values)
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
					// url={values.image}
					// setUrl={(url) => setFieldValue('image', url)}
					/>
					<input type="text" placeholder="Name" />
					<Textarea name="bio" placeholder="Bio" rows={3} />
					<input type="text" placeholder="Phone" />
                    <input type="text" placeholder="Birthdate" />
					<select>
                        <option disabled>Sex</option>
						<option>Male</option>
						<option>Female</option>
						<option>Other</option>
					</select>
                    <div>Intérêts</div>
                    <div>Vegan</div>
                    <select>
                        <option disabled>Allergies</option>
						<option>Vegan</option>
						<option>Gluten</option>
						<option>Other</option>
					</select>
					<button type="submit" className="secondary">
						Save
					</button>
				</Form>
			)}
		</Formik>
	)
}
