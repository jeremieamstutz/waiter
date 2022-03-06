import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { Select, Textarea } from 'components/ui/form-items'
import DatePicker from 'components/ui/datepicker'

import classes from './booking-form.module.css'
import { useRef, useState } from 'react'
import { useEffect } from 'react/cjs/react.development'

const MAX_DAYS = 12
const MAX_MONTHS = 2

function ButtonGrid({
	options,
	disabledOptions,
	value,
	setValue,
	custom = false,
	numColumns = 3,
	...props
}) {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef()
	const [manualInput, setManualInput] = useState()

	function handleButton(option) {
		setValue(option)
		setInputValue('')
		setManualInput(false)
	}

	function handleInputChange(event) {
		const value = event.target.value
		setInputValue(value)
		setValue(value)
	}

	function handleInputBlur(event) {
		if (inputValue) {
			setManualInput(true)
		}
	}

	useEffect(() => {
		if (!inputRef.current) return

		if (manualInput) {
			inputRef.current.style.background = 'var(--color-ui-secondary)'
			inputRef.current.style.color = 'white'
			inputRef.current.style.borderColor = 'var(--color-ui-secondary)'
		} else {
			inputRef.current.style.background = ''
			inputRef.current.style.color = ''
			inputRef.current.style.borderColor = ''
		}
	}, [manualInput])

	useEffect(() => {
		if (!value) {
			setInputValue('')
			setManualInput(false)
		}
	}, [value])
	return (
		<div {...props}>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
					gap: '0.5rem',
				}}
			>
				{options &&
					options.map((option, index) => (
						<div
							key={option}
							style={{
								padding: '0.75rem 0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								border: '1px solid #ddd',
								background:
									value == option
										? 'var(--color-ui-secondary)'
										: '#eee',
								borderColor:
									value == option
										? 'var(--color-ui-secondary)'
										: '#ddd',
								color: value == option ? '#fff' : '#000',
								borderRadius: '0.5rem',
								fontSize: '1.125rem',
								opacity:
									disabledOptions && disabledOptions[index]
										? 0.4
										: 1,
							}}
							onClick={() =>
								disabledOptions && disabledOptions[index]
									? null
									: handleButton(option)
							}
						>
							{option}
						</div>
					))}
			</div>
			{custom && (
				<input
					ref={inputRef}
					type="text"
					placeholder="Autre"
					style={{ marginTop: '0.5rem' }}
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
				/>
			)}
		</div>
	)
}

export default function BookingForm({ booking, message }) {
	const TODAY = new Date(new Date().setHours(0, 0, 0, 0))
	const possibleDates = [
		'Jeu. 23 Déc.',
		'Ven. 24 Déc.',
		'Sam. 25 Déc.',
		'Dim. 26 Déc.',
		'Lun. 27 Déc.',
		'Mar. 28 Déc.',
	]
	const [selectedDate, setSelectedDate] = useState(TODAY)
	const possibleMonths = ['Décembre', 'Janvier']
	const [selectedMonth, setSelectedMonth] = useState()
	const possibleDays = [...new Array(31).keys()]
	// const disabledDays = [...new Array(31).keys()].map(
	// 	(day) => day % 7 === 0 || day % 7 === 6 || day < today.getDate(),
	// )
	const [selectedDay, setSelectedDay] = useState()
	const possibleServices = ['Matin', 'Midi', 'Soir']
	const [selectedService, setSelectedService] = useState()
	const possibleHours = [
		{
			service: 'Matin',
			hours: [
				'7:00',
				'7:15',
				'7:30',
				'7:45',
				'8:00',
				'8:15',
				'8:30',
				'8:45',
			],
		},
		{
			service: 'Midi',
			hours: [
				'12:00',
				'12:15',
				'12:30',
				'12:45',
				'13:00',
				'13:15',
				'13:30',
				'13:45',
			],
		},
		{
			service: 'Soir',
			hours: [
				'19:00',
				'19:15',
				'19:30',
				'19:45',
				'20:00',
				'20:15',
				'20:30',
				'20:45',
			],
		},
	]
	const [selectedHour, setSelectedHour] = useState()
	const possibleGuests = [
		...new Array(5).fill(1).map((value, index) => value + index),
	]
	const [selectedNumGuests, setSelectedNumGuests] = useState()

	return (
		<>
			{message && <p style={{ margin: '0.25rem 0' }}>{message}</p>}
			<Formik
				initialValues={{
					restaurant: 1 || '',
					date: '' || '',
					hour: '' || '',
					guests: '' || '',
					comment: '' || '',
				}}
				validationSchema={Yup.object({
					name: Yup.string()
						.min(3, 'Must be 3 characters or more')
						.max(30, 'Must be 30 characters or less')
						.required('Name is required'),
					description: Yup.string().max(
						500,
						'Must be 500 characters or less',
					),
				})}
				onSubmit={async (values) => {
					// if (!category) {
					// 	await axios.post('/api/categories', {
					// 		category: {
					// 			...values,
					// 			restaurantId: restaurant.id,
					// 		},
					// 	})
					// } else {
					// 	await axios.put(`/api/categories/${category.id}`, {
					// 		category: values,
					// 	})
					// }
					// router.push({
					// 	pathname: '/[restaurantSlug]',
					// 	query: {
					// 		restaurantSlug: router.query.restaurantSlug,
					// 	},
					// })
				}}
			>
				{({ isSubmitting, isValid }) => (
					<Form className={classes.form}>
						{/* <div style={{ display: 'flex', gap: '1rem' }}></div> */}
						{/* <Select name="date" arial-label="Date">
							<option value="" disabled>
								Date
							</option>
							<option
								value={new Date().toISOString().split('T')[0]}
							>
								{new Date().toISOString().split('T')[0]}
							</option>
						</Select> */}
						{/* <Select name="guests" arial-label="Guests">
							<option value="" disabled>
								Nombre d'invités
							</option>
							{[
								...new Array(MAX_DAYS)
									.fill(1)
									.map((value, index) => value + index)
									.map((number) => (
										<option key={number} value={number}>
											{number}
										</option>
									)),
							]}
						</Select>
						<Select
							name="hour"
							arial-label="Hour"
							style={{ maxWidth: '8rem' }}
						>
							<option value="" disabled>
								Heure
							</option>
							<option>12</option>
						</Select> */}
						{/* <Select name="guests" arial-label="Guests">
						<option value="" disabled>
							Nombre d'invités
						</option>
						{[
							...new Array(MAX_DAYS)
								.fill(1)
								.map((value, index) => value + index)
								.map((number) => (
									<option key={number} value={number}>
										{number}
									</option>
								)),
						]}
					</Select> */}
						<section>
							<h2>Date</h2>
							{/* <ButtonGrid
							options={possibleDates}
							value={selectedDate}
							setValue={setSelectedDate}
							numColumns={2}
						/> */}
							<DatePicker
								selected={selectedDate}
								onChange={setSelectedDate}
								minDate={TODAY}
								maxDate={new Date().setMonth(
									TODAY.getMonth() + MAX_MONTHS,
								)}
							/>
						</section>
						<section>
							<h2>Service</h2>
							<ButtonGrid
								options={possibleServices}
								value={selectedService}
								setValue={setSelectedService}
								numColumns={possibleServices.length}
							/>
						</section>
						<section>
							<h2>Heure</h2>
							<ButtonGrid
								options={
									possibleHours.filter(({ service }) =>
										selectedService
											? service === selectedService
											: service === 'Midi',
									)[0].hours
								}
								value={selectedHour}
								setValue={setSelectedHour}
								numColumns={4}
							/>
						</section>
						<section>
							<h2>Nombre d'invités</h2>
							<ButtonGrid
								options={possibleGuests}
								value={selectedNumGuests}
								setValue={setSelectedNumGuests}
								custom={true}
								numColumns={5}
							/>
						</section>
						<section>
							<h2>Commentaires</h2>
							<Textarea
								name="comment"
								placeholder="Chaise haute, allergie, etc"
								arial-label="Chaise haute, allergie, etc"
								rows={3}
							/>
						</section>
						<section>
							<h2 style={{ marginBottom: 0 }}>Récap</h2>
							<p>
								{selectedDate.toLocaleDateString('fr-FR', {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}{' '}
								à {selectedHour} pour {selectedNumGuests}{' '}
								personnes
							</p>
						</section>
						<button
							type="submit"
							className="secondary"
							disabled={!isValid}
							// style={{ background: 'var(--color-primary)' }}
						>
							{isSubmitting
								? 'Chargement....'
								: booking
								? 'Mettre à jour'
								: 'Réserver'}
						</button>
					</Form>
				)}
			</Formik>
		</>
	)
}
