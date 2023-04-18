import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

import classes from './user-detail.module.css'
import track from 'utils/track'
import { useTranslation } from 'next-i18next'

export default function UserDetail({ user }) {
	const { data: session } = useSession()
	const router = useRouter()
	const { t } = useTranslation()

	return (
		<header className={classes.header}>
			<section className={classes.container}>
				<div className={classes.image}>
					<Image
						alt={`${user.firstName} ${user.lastname}`}
						src={user.image ?? '/images/defaults/user.png'}
						width={96}
						height={96}
						objectFit="cover"
					/>
				</div>
				<div className={classes.body}>
					<h2 className={classes.name}>
						{user.firstName} {user.lastName}
					</h2>
					<p className={classes.email}>{user.email}</p>
				</div>
			</section>
			{session?.user.id === user.id && (
				<div className={classes.actions}>
					<button
						onClick={() =>
							router.push(
								{
									pathname: router.pathname,
									query: {
										...router.query,
										editProfile: true,
									},
								},
								undefined,
								{ shallow: true },
							)
						}
					>
						{t('user:actions.editProfile')}
					</button>
					<button
						onClick={() => {
							signOut({
								callbackUrl: process.env.NEXT_PUBLIC_DOMAIN,
							})
							track.event({
								event_category: 'auth',
								event_name: 'logout',
							})
						}}
						className="secondary"
					>
						{t('user:actions.logout')}
					</button>
				</div>
			)}
		</header>
	)
}
