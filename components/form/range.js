import { useField } from 'formik'
import { useCallback } from 'react'
import { event } from 'utils/gtag'

import classes from './range.module.css'

export default function Range({ label, ...props }) {
	const [field, meta, helpers] = useField(props)

	const toPercent = useCallback(
		(value) => ((value - props.min) / (props.max - props.min)) * 100,
		[props.min, props.max],
	)

	return (
		<div className={classes.group}>
			{label && <label htmlFor={props.name}>{label}</label>}
			<div className={classes.container}>
				<input
					name={field.name}
					type="number"
					className={classes.value}
					value={field.value[0]}
					onChange={(event) => {
						const newMin = Math.max(
							Math.min(+event.target.value, field.value[1] - 1),
							props.min,
						)
						const newValues = [...field.value]
						newValues[0] = newMin
						helpers.setValue(newValues)
					}}
				/>
				<div className={classes.slider}>
					<input
						{...field}
						{...props}
						className={classes.thumb}
						type="range"
						id={props.name}
						value={field.value[0]}
						onChange={(event) => {
							const newMin = Math.min(
								+event.target.value,
								field.value[1] - 1,
							)
							const newValues = [...field.value]
							newValues[0] = newMin
							helpers.setValue(newValues)
						}}
						style={{ zIndex: 3 }}
						aria-label="Range min"
					/>
					<input
						{...field}
						{...props}
						type="range"
						id={props.name}
						className={classes.thumb}
						value={field.value[1]}
						onChange={(event) => {
							console.log(props.max)
							const newMax = Math.max(
								+event.target.value,
								field.value[0] + 1,
							)
							const newValues = [...field.value]
							newValues[1] = newMax
							helpers.setValue(newValues)
						}}
						style={{ zIndex: 4 }}
						aria-label="Range max"
					/>
					<div className={classes.track} />
					<div
						className={classes.range}
						style={{
							left: toPercent(field.value[0]) + '%',
							width:
								toPercent(field.value[1]) -
								toPercent(field.value[0]) +
								'%',
						}}
					/>
				</div>
				<input
					name={field.name}
					type="number"
					className={classes.value}
					value={field.value[1]}
					onChange={(event) => {
						const newMax = Math.min(
							Math.max(+event.target.value, field.value[0] + 1),
							props.max,
						)
						const newValues = [...field.value]
						newValues[1] = newMax
						helpers.setValue(newValues)
					}}
				/>
			</div>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}
