import { useField } from 'formik'
import { createContext, useContext } from 'react'

import classes from './vote.module.css'

const VoteContext = createContext()
const VoteProvider = VoteContext.Provider

function useVote() {
	return useContext(VoteContext)
}

export default function Vote(props) {
	const [field, meta, helpers] = useField({ ...props })

	return (
		<VoteProvider value={{ field, meta, helpers }}>
			<div className={classes.container}>
				<div
					className={`${classes.options} ${
						meta.touched && meta.error && classes['input-error']
					}`}
				>
					<Emoji value="up">👍</Emoji>
					<div
						style={{
							height: '2rem',
							width: '1px',
							background: '#eee',
						}}
					/>
					<Emoji value="down">👎</Emoji>
				</div>
				{meta.touched && meta.error ? (
					<div className={classes.error}>{meta.error}</div>
				) : null}
			</div>
		</VoteProvider>
	)
}

function Emoji({ value, children }) {
	const { field, helpers } = useVote()
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
			<span className={classes.vote}>{children}</span>
		</label>
	)
}
