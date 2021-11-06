import { useState } from 'react'

import Collapsible from 'components/ui/collapsible'

import useStandalone from 'hooks/useStandalone'
import useLocalStorage from 'hooks/useLocalStorage'

import classes from './add-to-home-screen.module.css'

// https://web.dev/customize-install/

export default function AddToHomeScreen() {
	const standalone = useStandalone()
	const [hidden, setHidden] = useLocalStorage('hideAddToHomeScreen', false)

	const [os, setOs] = useState('ios')

	if (standalone || hidden || hidden === undefined) return null

	return (
		<div className={classes.container}>
			<Collapsible
				trigger={
					<>
						Add{' '}
						<span style={{ color: 'var(--color-primary)' }}>
							waiter.so
						</span>{' '}
						to your home screen
					</>
				}
			>
				<div className={classes.body}>
					<div className={classes.tabs}>
						<h3
							onClick={() => setOs('ios')}
							className={`${classes.tab} ${
								os === 'ios' ? classes.selected : ''
							}`}
						>
							iOS
						</h3>
						<h3
							onClick={() => setOs('android')}
							className={`${classes.tab} ${
								os === 'android' ? classes.selected : ''
							}`}
						>
							Android
						</h3>
					</div>
					{os === 'ios' && (
						<>
							<div className={classes.step}>
								<h3>1. Click on the share button</h3>
								<div className={classes.screenshot} />
							</div>
							<div className={classes.step}>
								<h3>
									2. Click on &quot;Add to your
									homescreen&quot;
								</h3>
								<div className={classes.screenshot} />
							</div>
							<div className={classes.step}>
								<h3>3. Done. You can now open it</h3>
								<div className={classes.screenshot} />
							</div>
						</>
					)}
					{os === 'android' && (
						<>
							<div className={classes.step}>
								<h3>1. Click on the menu button</h3>
								<div className={classes.screenshot} />
							</div>
							<div className={classes.step}>
								<h3>
									2. Click on &quot;Add to your
									homescreen&quot;
								</h3>
								<div className={classes.screenshot} />
							</div>
							<div className={classes.step}>
								<h3>3. Done. You can now open it</h3>
								<div className={classes.screenshot} />
							</div>
						</>
					)}
					<button
						className="secondary"
						onClick={() => setHidden(true)}
					>
						Hide forever
					</button>
				</div>
			</Collapsible>
		</div>
	)
}
