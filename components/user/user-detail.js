import Image from 'next/image'

import classes from './user-detail.module.css'

export default function UserDetail({ user }) {
	return (
		<div className={classes.container}>
			<div className={classes.image}>
				<Image
					src={user.image ? user.image : '/images/defaults/user.png'}
					alt={user.name}
					width={96}
					height={96}
					objectFit="cover"
				/>
			</div>
			<div className={classes.body}>
				<h2 className={classes.name}>{user.name}</h2>
				<p className={classes.email}>{user.email}</p>
			</div>
		</div>
	)
}
