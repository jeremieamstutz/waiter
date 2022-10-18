import { useField } from 'formik'
import useDebounce from 'hooks/useDebounce'
import { useCallback, useEffect, useState } from 'react'

import classes from './range.module.css'

export default function Range({ label, ...props }) {
	const [field, meta, helpers] = useField(props)

	const toPercent = useCallback(
		(value) => ((value - props.min) / (props.max - props.min)) * 100,
		[props.min, props.max],
	)

	const [minValue, setMinValue] = useState([field.value[0]])
	const [maxValue, setMaxValue] = useState([field.value[1]])

	const debouncedMinValue = useDebounce(minValue, 100)
	useEffect(() => {
		const newMin = Math.min(debouncedMinValue, field.value[1] - 1)
		const newValues = [...field.value]
		newValues[0] = newMin
		helpers.setValue(newValues)
	}, [debouncedMinValue, field.value, helpers])

	const debouncedMaxValue = useDebounce(maxValue, 100)
	useEffect(() => {
		const newMax = Math.max(debouncedMaxValue, field.value[0] + 1)
		const newValues = [...field.value]
		newValues[1] = newMax
		helpers.setValue(newValues)
	}, [debouncedMaxValue, field.value, helpers])

	return (
		<div className={classes.group}>
			{label && <label htmlFor={props.name}>{label}</label>}
			<div className={classes.container}>
				<input
					name={field.name}
					type="number"
					className={classes.value}
					value={minValue}
					onChange={(event) => setMinValue(+event.target.value)}
				/>
				<div className={classes.slider}>
					<input
						{...field}
						{...props}
						className={classes.thumb}
						type="range"
						id={props.name}
						value={minValue}
						onChange={(event) => setMinValue(+event.target.value)}
						style={{ zIndex: 3 }}
						aria-label="Range min"
					/>
					<input
						{...field}
						{...props}
						type="range"
						id={props.name}
						className={classes.thumb}
						value={maxValue}
						onChange={(event) => setMaxValue(+event.target.value)}
						style={{ zIndex: 4 }}
						aria-label="Range max"
					/>
					<div className={classes.track} />
					<div
						className={classes.range}
						style={{
							left: toPercent(minValue) + '%',
							width:
								toPercent(maxValue) - toPercent(minValue) + '%',
						}}
					/>
				</div>
				<input
					name={field.name}
					type="number"
					className={classes.value}
					value={maxValue}
					onChange={(event) => setMaxValue(+event.target.value)}
				/>
			</div>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}
