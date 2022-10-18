import axios from 'axios'
import Input from 'components/form/input'
import Switch from 'components/form/switch'
import TrashIcon from 'components/icons/trash'
import Modal from 'components/ui/modal'
import { useFlags } from 'contexts/flags'
import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import { mutate } from 'swr'

function NewFeatureFlag() {
	const { t } = useTranslation()
	return (
		<Formik
			initialValues={{ key: '' }}
			onSubmit={async (values, { resetForm }) => {
				await axios.post('/api/flags', { ...values, enabled: true })
				await mutate('/api/flags')
				resetForm()
			}}
		>
			<Form
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				<Input name="key" placeholder="key" />
				<button type="submit" className="secondary">
					{t('common:misc.actions.create')}
				</button>
			</Form>
		</Formik>
	)
}

function FeatureFlag({ flag }) {
	async function handleDeleteFlag() {
		await axios.delete(`/api/flags/${flag.id}`)
		await mutate('/api/flags')
	}

	return (
		<Formik
			initialValues={{
				key: flag?.key || '',
				enabled: flag?.enabled ?? true,
				description: flag?.description || '',
			}}
			onSubmit={async (values) => {
				try {
					await axios.post(`/api/flags/${flag.id}`, values)
					await mutate('/api/flags')
				} catch (error) {
					console.log(error)
				}
			}}
		>
			{({ submitForm }) => (
				<Form
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<Switch
						name="enabled"
						label={flag.key}
						onClick={() => submitForm()}
					/>
					{flag && (
						<button
							type="button"
							style={{
								minWidth: 0,
								borderRadius: '50%',
								width: '3rem',
								height: '3rem',
								padding: 0,
								background: 'none',
							}}
							onClick={handleDeleteFlag}
						>
							<TrashIcon />
						</button>
					)}
				</Form>
			)}
		</Formik>
	)
}

export default function FlagsModal({ onClose }) {
	const { rawFlags } = useFlags()

	return (
		<Modal title="Flags" style={{ maxWidth: '30rem' }} onClose={onClose}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				{rawFlags.map((flag) => (
					<FeatureFlag key={flag.key} flag={flag} />
				))}
				<NewFeatureFlag />
			</div>
		</Modal>
	)
}
