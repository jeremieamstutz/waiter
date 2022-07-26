import { useField } from 'formik'

import classes from './select.module.css'

export default function Select({ label, style, ...props }) {
	const [field, meta] = useField(props)

	return (
		<div className={classes.group} style={style}>
			{label && <label htmlFor={props.name}>{label}</label>}
			<select {...field} {...props} id={props.name} />
			{meta.touched && meta.error ? (
				<div className={classes.error}>{meta.error}</div>
			) : null}
		</div>
	)
}
