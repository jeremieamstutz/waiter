import classes from './main.module.css'

export default function Main({ children, ...props }) {
	return (
		<main className={classes.main} {...props}>
			{children}
		</main>
	)
}
