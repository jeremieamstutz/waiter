import classes from './spinner.module.css'

export function Ring(props) {
	return <div className={classes.ring} {...props} />
}

export default function Spinner(props) {
	return (
		<div className={classes.overlay} {...props}>
			<Ring />
		</div>
	)
}
