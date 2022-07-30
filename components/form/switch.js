import { useField } from 'formik'

import classes from './switch.module.css'

export default function Switch({ label, style, ...props }) {
	const [field, meta] = useField({ ...props, type: 'checkbox' })

	return (
		<div className={classes.group} style={style}>
			<label htmlFor={props.name} className={classes.label}>
				<input
					{...field}
					{...props}
					type="checkbox"
					id={props.name}
					className={classes.checkbox}
				/>
				<div className={classes.switch} htmlFor={props.name}>
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
