import { useField } from 'formik'
import { useLayoutEffect, useRef, useState } from 'react'

import classes from './textarea.module.css'

export default function Textarea({
	label,
	help,
	className,
	style,
	prefix,
	suffix,
	...props
}) {
	const textAreaRef = useRef()
	const [text, setText] = useState('')
	const [textAreaHeight, setTextAreaHeight] = useState('auto')

	useLayoutEffect(() => {
		setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`)
	}, [text])

	const handleOnChange = (event) => {
		setTextAreaHeight('auto')
		setText(event.target.value)
	}

	const [field, meta] = useField(props)
	return (
		<div className={`${classes['form-group']} ${className}`} style={style}>
			{label && <label htmlFor={props.id || props.name}>{label}</label>}
			<div
				className={`${classes['input-group']} ${
					meta.touched && meta.error && classes['input-error']
				}`}
			>
				{prefix && (
					<label style={{ marginLeft: '1rem' }} htmlFor={props.name}>
						{prefix}
					</label>
				)}
				<textarea
					rows={4}
					{...field}
					{...props}
					id={props.name}
					className={classes.textarea}
					ref={textAreaRef}
					style={{
						height: textAreaHeight,
					}}
					onChange={(event) => {
						field.onChange(event)
						handleOnChange(event)
					}}
				></textarea>
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
