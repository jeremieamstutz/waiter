import { useState, useEffect } from 'react'

import Portal from 'components/misc/portal'
import CloseButton from 'components/buttons/close'

import classes from './back.module.css'
import { useHistory } from 'contexts/history'
import { useRouter } from 'next/router'

export default function BackButton() {
	const router = useRouter()

	return (
		<Portal selector="#back">
			<CloseButton
				className={`${classes.button} secondary`}
				onClick={() => router.back()}
			/>
		</Portal>
	)
}
