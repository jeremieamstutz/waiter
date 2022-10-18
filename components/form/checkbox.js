import { useField } from 'formik'
import { createContext, useContext } from 'react'

import classes from './checkbox.module.css'

const CheckboxContext = createContext()
const CheckboxProvider = CheckboxContext.Provider

function useCheckbox() {
	return useContext(CheckboxContext)
}

function CheckboxGroup({ label, children, ...props }) {
	const [field, meta, helpers] = useField({ ...props, type: 'checkbox' })

	return (
		<CheckboxProvider value={{ field, meta, helpers }}>
			<div className={classes.group} role="listbox">
				{label && <label>{label}</label>}
				<div className={classes.list} style={props.style}>
					{children}
				</div>
				{meta.touched && meta.error ? (
					<div className={classes.error}>{meta.error}</div>
				) : null}
			</div>
		</CheckboxProvider>
	)
}

function CheckboxGroupItem({ value, children, ...props }) {
	const { field, helpers } = useCheckbox()
	const checked = field.value?.find((el) => el === value)

	return (
		<label className={classes.container} {...props}>
			<input
				{...field}
				className={classes.checkbox}
				type="checkbox"
				checked={checked}
				onChange={() => {
					if (checked) {
						helpers.setValue(
							field.value.filter((el) => el !== value),
						)
					} else {
						if (field.value) {
							helpers.setValue([...field.value, value])
						} else {
							helpers.setValue([value])
						}
					}
				}}
			/>
			<span className={classes.checkmark} />
			<span className={classes.body}>{children}</span>
		</label>
	)
}

CheckboxGroup.Item = CheckboxGroupItem
export default CheckboxGroup

export function Checkbox({ children, label, ...props }) {
	const [field, meta] = useField({ ...props, type: 'checkbox' })
	console.log(field)

	return (
		<div className={classes['form-group']}>
			<div>
				<label className={classes.container} {...props}>
					<input
						{...field}
						type="checkbox"
						className={classes.checkbox}
					/>
					<span className={classes.checkmark} />
					<span className={classes.body}>{label}</span>
				</label>
			</div>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}
