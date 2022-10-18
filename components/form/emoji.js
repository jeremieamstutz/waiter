import { useField } from 'formik'
import { createContext, useContext } from 'react'

import classes from './emoji.module.css'

const EmojiContext = createContext()
const EmojiProvider = EmojiContext.Provider

function useEmoji() {
	return useContext(EmojiContext)
}

export default function Emojis(props) {
	const [field, meta, helpers] = useField({ ...props })

	return (
		<EmojiProvider value={{ field, meta, helpers }}>
			<div className={classes.container}>
				<div
					className={`${classes.emojis} ${
						meta.touched && meta.error && classes['input-error']
					}`}
				>
					<Emoji value="inlove">😍</Emoji>
					<Emoji value="happy">😃</Emoji>
					<Emoji value="confused">😕</Emoji>
					<Emoji value="crying">😭</Emoji>
				</div>
				{meta.touched && meta.error ? (
					<div className={classes.error}>{meta.error}</div>
				) : null}
			</div>
		</EmojiProvider>
	)
}

function Emoji({ value, children }) {
	const { field, helpers } = useEmoji()
	const checked = field.value == value
	return (
		<label className={classes.container}>
			<input
				className={classes.radio}
				type="radio"
				value={value}
				checked={checked}
				onChange={() => helpers.setValue(value)}
			/>
			<span className={classes.emoji}>{children}</span>
		</label>
	)
}
