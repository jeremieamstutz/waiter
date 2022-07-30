import { useField } from 'formik'
import { useLayoutEffect, useRef, useState } from 'react'

import classes from './textarea.module.css'

export default function Textarea({ label, ...props }) {
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
		<div className={classes.group}>
			{label && <label htmlFor={props.id || props.name}>{label}</label>}
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
			{meta.touched && meta.error && (
				<div className={classes.error}>{meta.error}</div>
			)}
		</div>
	)
}