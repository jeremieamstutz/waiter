import { useField } from 'formik'

import classes from './input.module.css'

export default function Input({ label, ...props }) {
	const [field, meta] = useField(props)
	return (
		<div className={classes.group}>
			{label && <label htmlFor={props.name}>{label}</label>}
			<input
				{...field}
				{...props}
				id={props.name}
				className={classes.input}
			/>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}
