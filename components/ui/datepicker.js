import { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'

import classes from './datepicker.module.css'

export default function DatePicker({
	onChange,
	selected,
	minDate,
	maxDate,
	...props
}) {
	const MONTHS = [
		'Janvier',
		'Février',
		'Mars',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre',
	]
	const DAYS_OF_WEEK = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

	function getDaysInMonth(year, month) {
		const date = new Date(year, month, 0)
		return date.getDate()
	}

	function getFirstDayOffset(year, month) {
		const date = new Date(year, month - 1, 1)
		return ((date.getDay() + 6) % 7) + 1
	}

	const initialDate = selected || new Date(new Date().setHours(0, 0, 0, 0))

	const [year, setYear] = useState(initialDate.getFullYear())
	const [month, setMonth] = useState(initialDate.getMonth() + 1)
	const [selectedDate, setSelectedDate] = useState(initialDate)

	const DAYS_IN_MONTH = getDaysInMonth(year, month)
	const FIRST_DAY_OFFSET = getFirstDayOffset(year, month)

	let DATES = []
	for (let i = FIRST_DAY_OFFSET - 1; i >= 1; i--) {
		const date = new Date(
			year,
			month - 2,
			getDaysInMonth(year, month - 1) + 1 - i,
		)
		DATES.push({
			date: date,
			active: false,
		})
	}

	for (let i = 1; i <= DAYS_IN_MONTH; i++) {
		const date = new Date(year, month - 1, i)
		DATES.push({
			date: date,
			active: true,
		})
	}

	const FINAL_WEEK_LENGTH = (DAYS_IN_MONTH + FIRST_DAY_OFFSET - 1) % 7
	const REMAINING_DAYS = FINAL_WEEK_LENGTH > 0 ? 7 - FINAL_WEEK_LENGTH : 0

	for (let i = 1; i <= REMAINING_DAYS; i++) {
		const date = new Date(year, month, i)
		DATES.push({
			date: date,
			active: false,
		})
	}

	// Check if active
	DATES = DATES.map(({ date, active }) => {
		// Min & Max
		active = date < minDate ? false : active
		active = date > maxDate ? false : active

		// Disabled
		active =
			date.getDay() % 7 === 0 || date.getDay() % 7 === 1 ? false : active

		return { date, active }
	})

	// Check if selected
	let foundValideDate = false
	DATES = DATES.map(({ date, active }) => {
		let selected = false
		if (date >= selectedDate && active && !foundValideDate) {
			selected = date.toDateString() === selectedDate.toDateString()
			foundValideDate = true
			// setSelectedDate(date)
		}
		return { date, active, selected }
	})
    // POUVOIR CHANGER LE SETSELECTEDDATE
    
	// useEffect(() => {}, [])
	// GERER LE ONCHANGE AVEC UN USEEFFECT

	function handleNextMonth() {
		if (month === 12) {
			setYear((year) => year + 1)
		}
		setMonth((month) => (month % 12) + 1)
	}

	function handlePreviousMonth() {
		if (month === 1) {
			setYear((year) => year - 1)
		}
		setMonth((month) => ((month - (2 % 12) + 12) % 12) + 1)
	}

	return (
		<div className={classes.container}>
			<div className={classes.month}>
				<span
					className={classes.previous}
					onClick={handlePreviousMonth}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</span>
				<span className={classes.current}>
					{MONTHS[month - 1]} {year}
				</span>
				<span className={classes.next} onClick={handleNextMonth}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</span>
			</div>
			<div className={classes.days}>
				{DAYS_OF_WEEK.map((day) => (
					<span key={day} className={classes.day}>
						{day}
					</span>
				))}
			</div>
			<div className={classes.dates}>
				{DATES.map(({ date, active, selected }) => {
					return (
						<span
							key={+date}
							className={`${classes.date} ${
								selected ? classes.selected : ''
							}`}
							style={{
								opacity: active ? 1 : 0.3,
							}}
							onClick={() => {
								active ? setSelectedDate(date) : null
								onChange?.(date)
							}}
						>
							{date.getDate()}
						</span>
					)
				})}
			</div>
		</div>
	)
}
