import { useRouter } from 'next/router'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import { Input, Textarea, Select } from 'components/ui/form-items'
import ImagePicker from 'components/ui/image-picker'

import classes from './restaurant-form.module.css'

export default function RestaurantForm({ restaurant }) {
	const router = useRouter()

	return (
		<Formik
			initialValues={{
				image: restaurant?.image || '',
				name: restaurant?.name || '',
				description: restaurant?.description || '',
				cuisine: restaurant?.cuisine || '',
				phone: restaurant?.phone || '',
				street: restaurant?.street || '',
				streetNumber: restaurant?.streetNumber || '',
				postalCode: restaurant?.postalCode || '',
				city: restaurant?.city || '',
				region: restaurant?.region || '',
				country: restaurant?.country || '',
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
				cuisine: Yup.string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less')
					.required('Cuisine is required'),
				phone: Yup.string().min(8, 'Must be 8 characters or more'),
				street: Yup.string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less')
					.required('Street is required'),
				streetNumber: Yup.number()
					.positive('Must be positive')
					.integer('Must be an integer'),
				postalCode: Yup.number()
					.positive('Must be positive')
					.integer('Must be an integer')
					.required('Postal code is required'),
				city: Yup.string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less')
					.required('City is required'),
				region: Yup.string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less'),
				country: Yup.string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less')
					.required('Country is required'),
			})}
			onSubmit={async (values) => {
				let response
				if (!restaurant) {
					response = await axios.post('/api/restaurants', {
						restaurant: {
							...values,
						},
					})
				} else {
					response = await axios.put(
						`/api/restaurants/${restaurant.id}`,
						{
							restaurant: {
								...values,
							},
						},
					)
				}
				// await sleep(2000)
				const data = response.data
				router.push({
					pathname: '/[restaurantSlug]',
					query: {
						restaurantSlug: data.restaurant.slug,
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
						arial-label="Name"
						autoComplete="off"
					/>
					<Textarea
						name="description"
						placeholder="Description"
						arial-label="Description"
						rows={3}
					/>
					<Select name="cuisine" arial-label="Cuisine">
						<option value="" disabled>
							Cuisine
						</option>
						<option value="Américaine">Américaine</option>
						<option value="Japonaise">Japonaise</option>
						<option value="Suisse">Suisse</option>
						<option value="Française">Française</option>
						<option value="Italienne">Italienne</option>
						<option value="Espagnole">Espagnole</option>
						<option value="Chinoise">Chinoise</option>
						<option value="Thaïlandaise">Thaïlandaise</option>
						<option value="Thaïlandaise">Vietnamienne</option>
						<option value="Mexicaine">Mexicaine</option>
						<option value="Indienne">Indienne</option>
						<option value="Portugaise">Portugaise</option>
						<option value="Grecque">Grecque</option>
						<option value="Asiatique">Asiatique</option>
						<option value="Africaine">Africaine</option>
						<option value="Méditerranéenne">Méditerranéenne</option>
					</Select>
					<Input
						name="phone"
						type="tel"
						placeholder="Phone"
						arial-label="Phone"
						autoComplete="off"
					/>
					<Input
						name="street"
						type="text"
						placeholder="Street"
						arial-label="Street"
						autoComplete="off"
					/>
					<Input
						name="streetNumber"
						type="number"
						placeholder="Number"
						arial-label="Street's number"
						autoComplete="off"
					/>
					<Input
						name="postalCode"
						type="number"
						placeholder="Postal Code"
						arial-label="Postal code"
						autoComplete="off"
					/>
					<Input
						name="city"
						type="text"
						placeholder="City"
						arial-label="City"
						autoComplete="off"
					/>
					<Input
						name="region"
						type="text"
						placeholder="Region"
						arial-label="Region"
						autoComplete="off"
					/>
					<Select name="country" arial-label="Country">
						<option value="" disabled>
							Country
						</option>
						<option value="Switzerland">Suisse</option>
					</Select>
					<button type="submit" className="secondary">
						{isSubmitting
							? 'Loading....'
							: restaurant
							? 'Update'
							: 'Save'}
					</button>
				</Form>
			)}
		</Formik>
	)
}
