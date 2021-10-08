import classes from './spinner.module.css'

export function Ring() {
	return <div className={classes.ring} />
}

export default function Spinner() {
	return (
		<div className={classes.overlay}>
			<Ring />
		</div>
	)
}
