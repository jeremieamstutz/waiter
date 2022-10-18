import { useField } from 'formik'
import { createContext, useContext } from 'react'

import classes from './tags.module.css'

const TagsContext = createContext()
const TagsProvider = TagsContext.Provider

function useTags() {
	return useContext(TagsContext)
}

function TagsGroup({ label, children, ...props }) {
	const [field, meta, helpers] = useField({ ...props, type: 'checkbox' })

	return (
		<TagsProvider value={{ field, meta, helpers }}>
			<div className={classes.group} role="listbox">
				{label && <label>{label}</label>}
				<div className={classes.list}>{children}</div>
				{meta.touched && meta.error ? (
					<div className={classes.error}>{meta.error}</div>
				) : null}
			</div>
		</TagsProvider>
	)
}

function TagsGroupItem({ value, children }) {
	const { field, helpers } = useTags()
	const checked = field.value?.find((el) => el === value) ?? false

	return (
		<label className={classes.container}>
			<input
				type="checkbox"
				name={field.name}
				value={checked}
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
				onBlur={field.onBlur}
				className={classes.checkbox}
			/>
			<span className={classes.body}>{children}</span>
		</label>
	)
}

TagsGroup.Item = TagsGroupItem
export default TagsGroup
