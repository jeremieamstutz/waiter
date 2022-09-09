import { useField } from 'formik'

import classes from './input.module.css'

export default function Input({ label, style, prefix, suffix, ...props }) {
	const [field, meta] = useField(props)
	return (
		<div className={classes['form-group']} style={style}>
			{label && <label htmlFor={props.name}>{label}</label>}
			<div className={classes['input-group']}>
				{prefix && (
					<label style={{ marginLeft: '1rem' }} htmlFor={props.name}>
						{prefix}
					</label>
				)}
				<input
					{...field}
					{...props}
					id={props.name}
					className={classes.input}
				/>
				{suffix && (
					<span style={{ marginRight: '1rem' }}>{suffix}</span>
				)}
			</div>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}
