import Link from 'next/link'
import track from 'utils/track'

import Menu from 'components/layout/menu'
import Logo from 'components/icons/logo'

import classes from './header.module.css'

export default function Header() {
	return (
		<div className={classes.header}>
			<Link
				href="/"
				className={classes.logo}
				onClick={() => {
					track.event({
						event_category: 'navigation',
						event_name: 'click_on_logo',
					})
				}}
			>
				<Logo />
			</Link>
			<Menu />
		</div>
	)
}
