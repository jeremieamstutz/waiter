import CloseButton from 'components/buttons/close'

import classes from './back.module.css'
import { useRouter } from 'next/router'

export default function BackButton() {
	const router = useRouter()

	return (
		<div className={classes.container} onClick={() => router.back()}>
			<CloseButton className="secondary" />
		</div>
	)
}
