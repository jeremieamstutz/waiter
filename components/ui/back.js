import { useState, useEffect } from 'react'

import Portal from 'components/misc/portal'
import CloseButton from 'components/buttons/close'

import classes from './back.module.css'
import { useHistory } from 'contexts/history'

export default function BackButton() {
	const [showBackButton, setShowBackButton] = useState(false)
    const { history, back } = useHistory()

	useEffect(() => {
		if (history.length > 1) {
			setShowBackButton(true)
		}
	}, [history])

	return (
		showBackButton && (
			<Portal selector="#back">
				<CloseButton
					className={`${classes.button} secondary`}
					onClick={() => back()}
				/>
			</Portal>
		)
	)
}
