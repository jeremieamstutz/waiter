import { useField } from 'formik'

import classes from './range.module.css'

export default function Range({ label, ...props }) {
	const [field, meta] = useField({ ...props, type: 'range' })

	return (
		<div className={classes.group}>
			{label && <label htmlFor={props.name}>{label}</label>}
			<input
				{...field}
				{...props}
				type="range"
				id={props.name}
				className={classes.input}
			/>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}
