import classes from './backdrop.module.css'

export default function Backdrop({ onClick }) {
	return <div className={classes.backdrop} onClick={onClick} />
}
