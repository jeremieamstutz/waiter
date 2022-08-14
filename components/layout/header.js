import Menu from './menu'

import classes from './header.module.css'
import Logo from 'components/icons/logo'
import Link from 'next/link'

export default function Header() {
	return (
		<div className={classes.header}>
			<Link href="/">
				<a className={classes.logo}>
					<Logo />
				</a>
			</Link>
			<Menu />
		</div>
	)
}
