import axios from 'axios'
import Textarea from 'components/form/textarea'
import Vote from 'components/form/vote'
import Modal from 'components/ui/modal'
import { Form, Formik } from 'formik'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useId } from 'react'
import track from 'utils/track'
import { object, string } from 'yup'

import classes from './feedback-modal.module.css'

export default function FeedbackModal({ onClose }) {
	const { t } = useTranslation()
	const router = useRouter()
	const formId = useId()

	return (
		<Formik
			initialValues={{ emotion: '', message: '' }}
			validationSchema={object({
				emotion: string(),
				message: string()
					.trim()
					.min(5, 'Your message must be at least 5 characters long')
					.required('Your message cant be empty'),
			})}
			onSubmit={async (values) => {
				const url = router.asPath.split('?')[0]
				await axios.post('/api/feedbacks', {
					...values,
					url,
				})
				track.event({
					event_category: 'feedback',
					event_name: 'send_feedback',
				})
				onClose()
			}}
		>
			<Modal
				title="Feedback"
				footer={
					<>
						<Vote name="emotion" />
						<button
							type="submit"
							form={formId}
							className="secondary"
							style={{ marginLeft: 'auto' }}
						>
							{t('common:misc.actions.send')}
						</button>
					</>
				}
				onClose={onClose}
				style={{ maxWidth: '35rem' }}
			>
				<Form id={formId}>
					<p style={{ margin: 0 }}>
						Please tell us what you like, what could be added, or
						what could be improved.
					</p>
					<Textarea name="message" placeholder="Message" rows={5} />
				</Form>
			</Modal>
		</Formik>
	)
}
