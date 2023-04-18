import Modal from 'components/ui/modal'
import Image from 'next/image'

export default function UserModal({ user, onClose }) {
	return (
		<Modal
			title={`${user.firstName} ${user.lastName}`}
			onClose={onClose}
			style={{ maxWidth: '30rem' }}
			footer={
				<>
					<button className="danger">Ban</button>
					<button className="secondary">Edit</button>
				</>
			}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '1rem',
				}}
			>
				<div
					style={{
						height: 128,
						borderRadius: '50%',
						overflow: 'hidden',
					}}
				>
					<Image
						alt={user.fullName}
						src={user.image ?? '/images/defaults/item.png'}
						width={128}
						height={128}
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
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.25rem',
					}}
				>
					<div
						style={{
							display: 'flex',
							gap: '0.5rem',
							alignItems: 'center',
							color: '#aaa',
						}}
					>
						<h2 style={{ margin: 0, textAlign: 'center' }}>
							{user.firstName} {user.lastName}
						</h2>
						•
						<p style={{ margin: 0, textAlign: 'center' }}>
							{new Date(user.createdAt).toLocaleDateString()}
						</p>
					</div>
					<p style={{ margin: 0, textAlign: 'center' }}>
						{user.email}
					</p>
				</div>
			</div>
		</Modal>
	)
}
