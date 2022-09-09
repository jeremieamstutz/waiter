import Modal from 'components/ui/modal'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { date, number, object, string } from 'yup'

import sleep from 'utils/sleep'

import Select from 'components/form/select'
import Textarea from 'components/form/textarea'

import classes from './booking-modal.module.css'

export default function BookingModal({ onClose }) {
	const { t } = useTranslation()
	const router = useRouter()

	const id = 'booking'

	return (
		<Formik
			initialValues={{
				date: new Date().toISOString().split('T')[0],
				hour: '20:00',
				guests: 2,
				remark: '',
			}}
			validationSchema={object({
				date: date().required('Date is required'),
				hour: string().required('Hour is required'),
				guests: number()
					.required()
					.positive()
					.integer('Number of guests is required'),
				remark: string().max(240, 'Remark is too long'),
			})}
			onSubmit={async (values, { setSubmitting, setStatus }) => {
				console.log('submitting')
				await sleep(500)
				setSubmitting(false)
				setStatus('success')
			}}
		>
			{({ status, isSubmitting }) => (
				<Modal
					title={t('booking:header.booking')}
					onClose={onClose}
					footer={
						<>
							{status === 'success' ? (
								<>
									<div
										style={{
											marginLeft: '0.5rem',
											color: '#165901',
											fontSize: '1.125rem',
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
											fontFamily: 'Rubik',
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="#165901"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										{t('booking:body.confirmation')}
									</div>
									<div
										style={{
											display: 'flex',
											gap: '1rem',
										}}
									>
										{/* <button>
											{t('common:misc.actions.edit')}
										</button> */}
										<button
											onClick={onClose}
											className="secondary"
										>
											{t('common:misc.actions.close')}
										</button>
									</div>
								</>
							) : (
								<>
									<button onClick={onClose}>
										{t('common:misc.actions.cancel')}
									</button>
									<button
										className="secondary"
										type="submit"
										form={id}
									>
										{isSubmitting
											? t('common:misc.actions.loading')
											: t('booking:footer.book')}
									</button>
								</>
							)}
						</>
					}
				>
					<Form className={classes.form} id={id}>
						<section>
							<Select
								label={t('booking:body.date.label')}
								name="date"
								disabled={status === 'success'}
							>
								{[...Array(30).keys()].map((day) => {
									let date = new Date()
									date.setDate(date.getDate() + day)
									let value = date.toISOString().split('T')[0]
									return (
										<option value={value} key={value}>
											{date.toLocaleDateString(
												router.locale,
												{
													weekday: 'long',
													month: 'long',
													day: 'numeric',
												},
											)}
										</option>
									)
								})}
							</Select>
							<Select
								label={t('booking:body.hour.label')}
								name="hour"
								disabled={status === 'success'}
							>
								<optgroup
									label={t(
										'booking:body.hour.options.breakfast',
									)}
								>
									<option value="07:00">07:00</option>
									<option value="07:30">07:30</option>
									<option value="08:00">08:00</option>
									<option value="08:30">08:30</option>
									<option value="09:00">09:00</option>
									<option value="09:30">09:30</option>
									<option value="10:00">10:00</option>
								</optgroup>
								<optgroup
									label={t('booking:body.hour.options.lunch')}
								>
									<option value="11:30">11:30</option>
									<option value="12:00">12:00</option>
									<option value="12:30">12:30</option>
									<option value="13:00">13:00</option>
									<option value="13:30">13:30</option>
									<option value="14:00">14:00</option>
									<option value="14:30">14:30</option>
								</optgroup>
								<optgroup
									label={t(
										'booking:body.hour.options.dinner',
									)}
								>
									<option value="18:00">18:00</option>
									<option value="18:30">18:30</option>
									<option value="19:00">19:00</option>
									<option value="19:30">19:30</option>
									<option value="20:00">20:00</option>
									<option value="20:30">20:30</option>
									<option value="21:00">21:00</option>
									<option value="21:30">21:30</option>
								</optgroup>
							</Select>
						</section>
						<section>
							<Select
								label={t('booking:body.guests.label')}
								name="guests"
								disabled={status === 'success'}
							>
								{[...Array(10).keys()].map((number) => (
									<option value={number + 1} key={number}>
										{number + 1}{' '}
										{t('booking:body.guests.option', {
											count: number + 1,
										})}
									</option>
								))}
							</Select>
						</section>
						<section>
							<Textarea
								label={t('booking:body.remark.label')}
								name="remark"
								placeholder={t(
									'booking:body.remark.placeholder',
								)}
								rows={3}
								disabled={status === 'success'}
							/>
						</section>
						{/* {status === 'success' && (
							<section>
								<div
									style={{
										width: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										gap: '0.5rem',
										background: '#edfce8',
										padding: '1rem',
										borderRadius: '0.5rem',
									}}
								>
									<div
										style={{
											color: '#165901',
											fontSize: '1.125rem',
											display: 'flex',
											alignItems: 'center',
											gap: '0.5rem',
											fontFamily: 'Rubik',
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={20}
											height={20}
											viewBox="0 0 20 20"
											fill="#165901"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										{t('booking:body.confirmation')}
									</div>
									<button
										style={{
											background: '#165901',
											color: '#ffffff',
											fontSize: '1.125rem',
										}}
									>
										Modifier
									</button>
								</div>
							</section>
						)} */}
					</Form>
				</Modal>
			)}
		</Formik>
	)
}
