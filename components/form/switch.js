import { useField } from 'formik'
import { useId } from 'react'

import classes from './switch.module.css'

export default function Switch({ label, style, ...props }) {
	const [field, meta] = useField({ ...props, type: 'checkbox' })
	const inputId = useId()

	return (
		<div className={classes.group} style={style}>
			<label className={classes.label} htmlFor={inputId}>
				<input
					{...field}
					{...props}
					id={inputId}
					type="checkbox"
					className={classes.checkbox}
				/>
				<div className={classes.switch}>
					<span className={classes.thumb} />
				</div>
				{label}
			</label>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}
