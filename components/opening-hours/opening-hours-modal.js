import { Form, Formik, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
	getMinutesOfTheDay,
	getWeekdays,
	isInARange,
	minutesToTime,
	shiftStartDay,
} from 'utils/time'
import { array, object, string } from 'yup'

import sleep from 'utils/sleep'

import Modal from 'components/ui/modal'
import Input from 'components/form/input'

import classes from './opening-hours-modal.module.css'

function TimeRange({ id }) {
	const { t } = useTranslation()

	const { values, setFieldValue } = useFormikContext()

	const ranges = values[id]

	return (
		<div
			style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
			}}
		>
			{ranges.map((range, index) => (
				<div
					key={index}
					style={{
						display: 'flex',
						gap: '0.5rem',
						alignItems: 'flex-start',
					}}
				>
					<Input
						type="time"
						name={`[${id}][${index}].start`}
						style={{ flex: 1 }}
					/>
					<span style={{ lineHeight: '3rem' }}>-</span>
					<Input type="time" name={`[${id}][${index}].end`} />
					<button
						type="button"
						style={{
							width: '3rem',
							height: '3rem',
							borderRadius: '50%',
							minWidth: 0,
							flexShrink: 0,
							padding: 0,
							background: 'transparent',
						}}
						onClick={() => {
							setFieldValue(
								id,
								ranges.filter((item, idx) => idx !== index),
							)
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={20}
							height={20}
							viewBox="0 0 20 20"
							fill="#666"
						>
							<path
								fillRule="evenodd"
								d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			))}
			<button
				className="text"
				type="button"
				style={{
					color: '#666',
					width: 'fit-content',
					lineHeight: '1.125rem',
				}}
				onClick={() =>
					setFieldValue(id, [...ranges, { start: '', end: '' }])
				}
			>
				{t('common:misc.actions.addMore')}
			</button>
		</div>
	)
}

export default function OpeningHoursModal({ onClose }) {
	const { t } = useTranslation()
	const router = useRouter()

	const OPENING_HOURS = [
		[
			{ start: 570, end: 885 },
			{ start: 1050, end: 1440 },
		],
		[{ start: 570, end: 1440 }],
		[{ start: 570, end: 1440 }],
		[{ start: 570, end: 1440 }],
		[{ start: 570, end: 1440 }],
		[],
		[],
	]

	const now = new Date()
	const today = shiftStartDay(now.getDay())
	const minutes = getMinutesOfTheDay(now)
	const isOpen = isInARange(minutes, OPENING_HOURS[today])

	const [isEditing, setIsEditing] = useState(false)

	const id = 'openingHours'

	if (isEditing) {
		return (
			<Formik
				initialValues={[
					[{ start: '', end: '' }],
					[{ start: '', end: '' }],
					[{ start: '', end: '' }],
					[{ start: '', end: '' }],
					[{ start: '', end: '' }],
					[{ start: '', end: '' }],
					[{ start: '', end: '' }],
				]}
				// initialValues={{
				// 	monday: [{ start: '', end: '' }],
				// 	tuesday: [{ start: '', end: '' }],
				// 	wednesday: [{ start: '', end: '' }],
				// 	thursday: [{ start: '', end: '' }],
				// 	friday: [{ start: '', end: '' }],
				// 	saturday: [{ start: '', end: '' }],
				// 	sunday: [{ start: '', end: '' }],
				// }}
				validationSchema={array(
					array(
						object({
							start: string().required(
								t('common:misc.validations.required'),
							),
							end: string().required(
								t('common:misc.validations.required'),
							),
						}),
					),
				)}
				// validationSchema={object({
				// 	monday: array(
				// 		object({
				// 			start: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 			end: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 		}),
				// 	),
				// 	tuesday: array(
				// 		object({
				// 			start: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 			end: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 		}),
				// 	),
				// 	wednesday: array(
				// 		object({
				// 			start: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 			end: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 		}),
				// 	),
				// 	thursday: array(
				// 		object({
				// 			start: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 			end: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 		}),
				// 	),
				// 	friday: array(
				// 		object({
				// 			start: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 			end: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 		}),
				// 	),
				// 	saturday: array(
				// 		object({
				// 			start: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 			end: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 		}),
				// 	),
				// 	sunday: array(
				// 		object({
				// 			start: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 			end: string().required(
				// 				t('common:misc.validations.required'),
				// 			),
				// 		}),
				// 	),
				// })}
				onSubmit={async (values, { setSubmitting, setStatus }) => {
					console.log('submitting')
					console.log(values)
					await sleep(500)
					setSubmitting(false)
					setStatus('success')
				}}
			>
				{({ isSubmitting }) => (
					<>
						<Modal
							title={t('restaurant:details.openingHours.title')}
							onClose={onClose}
							footer={
								<>
									<button onClick={() => setIsEditing(false)}>
										{t('common:misc.actions.cancel')}
									</button>
									<button
										className="secondary"
										type="submit"
										form={id}
									>
										{isSubmitting
											? t('common:misc.actions.loading')
											: t('common:misc.actions.save')}
									</button>
								</>
							}
						>
							<Form id={id}>
								<p
									style={{
										textAlign: 'center',
										margin: 0,
										background: '#fff2bf',
										borderRadius: '0.5rem',
										padding: '1rem',
										color: '#855a00',
									}}
								>
									{t('restaurant:details.openingHours.tip')}
								</p>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										margin: '0 -0.5rem',
									}}
								>
									{[
										'monday',
										'tuesday',
										'wednesday',
										'thursday',
										'friday',
										'saturday',
										'sunday',
									].map((weekday, index) => (
										<div
											key={index}
											className={classes.day}
										>
											<div
												style={{
													fontSize: '1.125rem',
													lineHeight: '1.125rem',
													minWidth: '8rem',
													color:
														weekday === today
															? isOpen
																? '#165901'
																: '#a00'
															: '#333',
												}}
											>
												{
													getWeekdays(router.locale)[
														index
													]
												}
											</div>
											<TimeRange id={index} />
										</div>
									))}
								</div>
							</Form>
						</Modal>
					</>
				)}
			</Formik>
		)
	} else {
		return (
			<Modal
				title={t('restaurant:details.openingHours.title')}
				onClose={onClose}
				footer={
					<button
						onClick={() => setIsEditing(true)}
						className="secondary"
						style={{ marginLeft: 'auto' }}
					>
						{t('common:misc.actions.edit')}
					</button>
				}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						margin: '0 -0.5rem',
					}}
				>
					{OPENING_HOURS.map((ranges, weekday) => (
						<div
							key={weekday}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								padding: '1rem',
								borderRadius: '0.5rem',
								background:
									weekday === today
										? isOpen
											? '#edfce8'
											: '#fee'
										: '',
								border:
									weekday === today
										? isOpen
											? '1px solid #c5edb9'
											: '1px solid #fcc'
										: '',
							}}
						>
							<div
								style={{
									fontSize: '1.125rem',
									color:
										weekday === today
											? isOpen
												? '#165901'
												: '#a00'
											: '#333',
								}}
							>
								{getWeekdays(router.locale)[weekday]}
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '0.5rem',
								}}
							>
								{ranges.length === 0 ? (
									<div
										style={{
											fontFamily: 'Rubik',
											fontSize: '1.125rem',
											color:
												weekday === today
													? '#a00'
													: '#333',
										}}
									>
										{t('restaurant:details.closed')}
									</div>
								) : (
									ranges.map((hours, index) => (
										<div
											key={index}
											style={{
												fontFamily: 'Rubik',
												fontSize: '1.125rem',
												color:
													weekday === today
														? isOpen
															? '#165901'
															: '#a00'
														: '#333',
											}}
										>
											{`${minutesToTime(
												hours.start,
											)} - ${minutesToTime(hours.end)}`}
										</div>
									))
								)}
							</div>
						</div>
					))}
				</div>
			</Modal>
		)
	}
}
