import Menu from './menu'
import AddToHomeScreen from 'components/cta/add-to-home-screen'

import classes from './header.module.css'

export default function Header({ children }) {
	return (
		<div className={classes.header}>
			{children}
			{/* <AddToHomeScreen /> */}
			<Menu />
		</div>
	)
}
