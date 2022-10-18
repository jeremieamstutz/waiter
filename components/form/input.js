import { useField } from 'formik'
import { useId } from 'react'

import classes from './input.module.css'

export default function Input({
	label,
	help,
	className,
	style,
	prefix,
	suffix,
	...props
}) {
	const [field, meta] = useField(props)
	const inputId = useId()

	return (
		<div className={`${classes['form-group']} ${className}`} style={style}>
			{label && <label htmlFor={inputId}>{label}</label>}
			<div
				className={`${classes['input-group']} ${
					meta.touched && meta.error && classes['input-error']
				}`}
			>
				{prefix && (
					<label style={{ marginLeft: '1rem' }}>{prefix}</label>
				)}
				<input
					{...field}
					{...props}
					id={inputId}
					className={classes.input}
				/>
				{suffix && (
					<span style={{ marginRight: '1rem' }}>{suffix}</span>
				)}
			</div>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
			{help && <div className={classes.help}>{help}</div>}
		</div>
	)
}
