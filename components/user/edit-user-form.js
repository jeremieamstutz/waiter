import { useRef } from 'react'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import axios from 'axios'
import { useTranslation } from 'next-i18next'

import useUploadFile from 'hooks/useUploadFile'

import Input from 'components/form/input'
import Textarea from 'components/form/textarea'
import RadioGroup from 'components/form/radio'
import Select from 'components/form/select'

function CircularProgressBar({ loading, progress, children }) {
	return (
		<div
			style={{
				width: '10rem',
				height: '10rem',
				padding: loading ? '0.75rem' : 0,
				borderRadius: '50%',
				background: `conic-gradient(#a00 ${
					progress * 3.6
				}deg, #ccc 0deg)`,
				transition: 'all 150ms',
			}}
		>
			{children}
		</div>
	)
}

function ProfilePicture({ value, onChange }) {
	const { loading, progress, uploadFile } = useUploadFile('/api/upload')
	const fileInputRef = useRef()
	const { t } = useTranslation()

	async function handleFileInput(event) {
		const file = event.target.files[0]
		if (file) {
			const url = await uploadFile(file)
			onChange(url)
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
				alignItems: 'center',
				marginBottom: '1rem',
			}}
		>
			<CircularProgressBar loading={loading} progress={progress}>
				<div
					style={{
						borderRadius: '50%',
						border: '1px solid #eee',
						cursor: 'pointer',
					}}
				>
					<Image
						alt="Image preview"
						src={value ?? '/images/defaults/user.png'}
						width={128}
						height={128}
						style={{
							display: 'block',
							width: '100%',
							height: 'auto',
							aspectRatio: 1,
							objectFit: 'cover',
							borderRadius: '50%',
						}}
						onClick={() =>
							fileInputRef && fileInputRef.current.click()
						}
					/>
				</div>
			</CircularProgressBar>
			<input
				ref={fileInputRef}
				type="file"
				onChange={handleFileInput}
				style={{ display: 'none' }}
			/>
			{loading ? (
				<div style={{ fontSize: '1.125rem' }}>
					{t('common:misc.actions.loading')}
				</div>
			) : (
				<button
					type="button"
					className="text"
					onClick={() => fileInputRef && fileInputRef.current.click()}
				>
					{t('user:fields.photo.action')}
				</button>
			)}
		</div>
	)
}

export default function UserForm({ user, onSubmit }) {
	const { t } = useTranslation()
	return (
		<Formik
			enableReinitialize={true}
			initialValues={{
				image: user?.image || '',
				firstName: user?.firstName || '',
				lastName: user?.lastName || '',
				phone: user?.phone || '',
				email: user?.email || '',
				birthdate: user?.birthdate || '',
				bio: user?.bio || '',
				language: user?.language || '',
				country: user?.country || '',
				gender: user?.gender || '',
			}}
			onSubmit={async (values) => {
				await axios({
					method: 'PUT',
					url: `/api/users/${user.id}`,
					data: values,
				})
				onSubmit()
			}}
		>
			{({ values, setFieldValue }) => (
				<Form id="user">
					<ProfilePicture
						value={values.image}
						onChange={(url) => setFieldValue('image', url)}
					/>
					<div style={{ display: 'flex', gap: '1rem' }}>
						<Input
							type="text"
							label={t('user:fields.firstName.label')}
							name="firstName"
							placeholder="John"
						/>
						<Input
							type="text"
							label={t('user:fields.lastName.label')}
							name="lastName"
							placeholder="Doe"
						/>
					</div>
					<Input
						type="tel"
						label={t('user:fields.phone.label')}
						name="phone"
						placeholder="+41 12 345 67 89"
						help={t('user:fields.phone.help')}
					/>
					<Input
						type="email"
						label={t('user:fields.email.label')}
						name="email"
						disabled={true}
					/>
					<Input
						type="date"
						label={t('user:fields.birthdate.label')}
						name="birthdate"
					/>
					<Textarea
						label={t('user:fields.bio.label')}
						name="bio"
						help={
							<div
								style={{
									fontFamily: 'Rubik',
									color:
										values.bio.length <= 150
											? '#666'
											: 'var(--color-danger)',
								}}
							>{`${values.bio.length}/150`}</div>
						}
					/>
					<Select
						label={t('user:fields.language.label')}
						name="language"
					>
						<option value="en">English</option>
						<option value="fr">Français</option>
						<option value="de">Deutsch</option>
					</Select>
					<Select
						label={t('user:fields.country.label')}
						name="country"
					>
						<option value="switzerland">Switzerland</option>
					</Select>
					<RadioGroup
						label={t('user:fields.gender.label')}
						name="gender"
						style={{ display: 'flex', gap: '2rem' }}
					>
						<RadioGroup.Item value="male">
							{t('user:fields.gender.options.male')}
						</RadioGroup.Item>
						<RadioGroup.Item value="female">
							{t('user:fields.gender.options.female')}
						</RadioGroup.Item>
						<RadioGroup.Item value="other">
							{t('user:fields.gender.options.other')}
						</RadioGroup.Item>
					</RadioGroup>
				</Form>
			)}
		</Formik>
	)
}
