import { useState, useEffect, useRef } from 'react'
import { useField } from 'formik'

import classes from './form-items.module.css'

export function Input({ label, ...props }) {
	const [field, meta] = useField(props)
	return (
		<div className={classes.group}>
			{label && <label htmlFor={props.id || props.name}>{label}</label>}
			<input className={classes.input} {...field} {...props} />
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}

export function Textarea({ label, ...props }) {
	const textAreaRef = useRef()
	const [text, setText] = useState('')
	const [textAreaHeight, setTextAreaHeight] = useState('auto')

	useEffect(() => {
		setTextAreaHeight(`${textAreaRef.current?.scrollHeight + 4}px`)
	}, [text])

	const handleOnChange = (event) => {
		setTextAreaHeight('auto')
		setText(event.target.value)
	}

	const [field, meta] = useField(props)
	return (
		<div className={classes.group}>
			{label && <label htmlFor={props.id || props.name}>{label}</label>}
			<textarea
				className={classes.textarea}
				{...field}
				{...props}
				ref={textAreaRef}
				rows={4}
				style={{
					height: textAreaHeight,
				}}
				onChange={(event) => {
					field.onChange(event)
					handleOnChange(event)
				}}
			></textarea>
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}

export function Checkbox({ children, ...props }) {
	const [field, meta] = useField({ ...props, type: 'checkbox' })
	return (
		<div className={classes.group}>
			<label className={classes.checkbox}>
				<input type="checkbox" {...field} {...props} />
				{children}
			</label>
			{meta.touched && meta.error ? (
				<div className={classes.error}>{meta.error}</div>
			) : null}
		</div>
	)
}

export function Select({ label, ...props }) {
	const [field, meta] = useField(props)
	return (
		<div className={classes.group}>
			{label && <label htmlFor={props.id || props.name}>{label}</label>}
			<select {...field} {...props} className={classes.error} />
			{meta.touched && meta.error ? (
				<div className={classes.error}>{meta.error}</div>
			) : null}
		</div>
	)
}

export function Price({ label, ...props }) {
	const [field, meta] = useField(props)
	return (
		<div className={classes.group}>
			{label && <label htmlFor={props.id || props.name}>{label}</label>}
			<div>
				<Input
					name="price"
					type="number"
					placeholder="0.00"
					autoComplete="off"
				/>
				<Select name="currency">
					<option>CHF</option>
				</Select>
			</div>
			{/* <ErrorMessage name="price" />
			<ErrorMessage name="currency" /> */}
		</div>
	)
}