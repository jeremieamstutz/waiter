import Image from 'next/image'
import { useRouter } from 'next/router'

export default function UserCard({ user }) {
	const router = useRouter()
	return (
		<div
			onClick={() =>
				router.push(
					{
						pathname: router.pathname,
						query: {
							...router.query,
							user: user.id,
						},
					},
					undefined,
					{ shallow: true },
				)
			}
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '1rem',
				cursor: 'pointer',
			}}
		>
			<div
				style={{
					width: 48,
					height: 48,
					borderRadius: '50%',
					overflow: 'hidden',
				}}
			>
				<Image
					alt={user.fullName}
					src={user.image ?? '/images/defaults/item.png'}
					width={48}
					height={48}
					sizes="96px"
					style={{
						display: 'block',
						width: '100%',
						height: 'auto',
						aspectRatio: 1,
						objectFit: 'cover',
						borderRadius: '50%',
					}}
				/>
			</div>
			<div>
				<h2 style={{ margin: 0 }}>
					{user.firstName} {user.lastName}
				</h2>
				<p style={{ margin: 0 }}>{user.email}</p>
			</div>
		</div>
	)
}
