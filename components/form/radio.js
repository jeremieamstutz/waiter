import { useField } from 'formik'
import { createContext, useContext } from 'react'

import classes from './radio.module.css'

const RadioContext = createContext()
const RadioProvider = RadioContext.Provider

function useRadio() {
	return useContext(RadioContext)
}

function RadioGroup({ label, help, children, style, ...props }) {
	const [field, meta, helpers] = useField({ ...props, type: 'checkbox' })

	return (
		<RadioProvider value={{ field, meta, helpers }}>
			<div className={classes.group}>
				{label && <label>{label}</label>}
				<div className={classes.list} style={style}>
					{children}
				</div>
				{meta.touched && meta.error ? (
					<div className={classes.error}>{meta.error}</div>
				) : null}
				{help && <div className={classes.help}>{help}</div>}
			</div>
		</RadioProvider>
	)
}

function RadioGroupItem({ value, children }) {
	const { field, helpers } = useRadio()
	const checked = field.value == value

	return (
		<label className={classes.container}>
			<input
				{...field}
				className={classes.radio}
				type="radio"
				checked={checked}
				onChange={() => helpers.setValue(value)}
			/>
			<span className={classes.checkmark} />
			<span className={classes.body}>{children}</span>
		</label>
	)
}

RadioGroup.Item = RadioGroupItem
export default RadioGroup
