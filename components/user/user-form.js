import { useRouter } from 'next/router'
import axios from 'axios'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import ImagePicker from 'components/ui/image-picker'
import Input from 'components/form/input'
import Select from 'components/form/select'

import classes from './user-form.module.css'

export default function UserForm({ user, isNewUser }) {
	const router = useRouter()
	return (
		<Formik
			initialValues={{
				image: user?.image || '',
				name: user?.name || '',
				phone: user?.phone || '',
				birthdate: user?.birthdate || '',
				sex: user?.sex || '',
			}}
			validationSchema={Yup.object({
				image: Yup.string('Image must be a string'),
				name: Yup.string()
					.min(3, 'Must be 3 characters or more')
					.max(30, 'Must be 30 characters or less')
					.required('Name is required'),
				phone: Yup.string().min(8, 'Must be 8 characters or more'),
				birthdate: Yup.date().min(
					'1900-01-01',
					'You must be younger than that',
				),
				sex: Yup.mixed().oneOf(
					['male', 'female', 'other'],
					'Wrong entry',
				),
			})}
			onSubmit={async (values) => {
				await axios.put(`/api/users/${user.id}`, {
					user: values,
				})
				router.push({
					pathname: isNewUser ? router.query.callbackUrl : '/account',
				})
			}}
		>
			{({ values, setFieldValue, isSubmitting }) => (
				<Form className={classes.form}>
					<ImagePicker
						url={values.image}
						setUrl={(url) => setFieldValue('image', url)}
						style={{ width: 256, height: 256, borderRadius: 128 }}
					/>
					<Input
						name="name"
						type="text"
						placeholder="Name"
						arial-label="Name"
					/>
					<Input
						name="phone"
						type="text"
						placeholder="Phone"
						arial-label="Phone"
					/>
					<Input
						name="birthdate"
						type="date"
						placeholder="Birthdate"
						arial-label="Birthdate"
					/>
					<Select name="sex" arial-label="Sex">
						<option value="" disabled>
							Sex
						</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</Select>
					<button type="submit" className="secondary">
						{isSubmitting
							? 'Loading....'
							: !isNewUser
							? 'Update'
							: 'Save'}
					</button>
				</Form>
			)}
		</Formik>
	)
}
