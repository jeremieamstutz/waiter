import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import classes from './user-detail.module.css'

export default function UserDetail() {
	const { data: session, status } = useSession()

	return (
		<div className={classes.container}>
			<div className={classes.image}>
				<Image
					src={session.user.image}
					alt={session.user.name}
					width={96}
					height={96}
				/>
			</div>
			<div className={classes.body}>
				<h2 className={classes.name}>{session.user.name}</h2>
				<p className={classes.email}>{session.user.email}</p>
				{/* <Link href="/account/edit">
					<a className={classes.edit}>Edit</a>
				</Link> */}
			</div>
		</div>
	)
}
