import ChevronIcon from 'components/icons/chevron'
import Modal from 'components/ui/modal'
import Image from 'next/image'
import { groupBy } from 'utils/processing'
import { capitalizeFirstLetter } from 'utils/text'

import classes from './bookings-modal.module.css'

const BOOKINGS = [
	{
		id: 1,
		date: new Date(),
		hour: '19:00',
		guests: 2,
		remark: 'We dont have a lot of time',
		table: '',
		status: 'pending',
		user: {
			image: {
				alt: 'Jérémie Amstutz',
				url: 'https://waiter.fra1.digitaloceanspaces.com/b99afa49-92f3-457f-9a97-0d01a14c8c59',
			},
			firstName: 'Jérémie',
			lastName: 'Amstutz',
		},
	},
	{
		id: 2,
		date: new Date(),
		hour: '19:15',
		guests: 3,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: '',
			firstName: 'Sébastien',
			lastName: 'Hachemane',
		},
	},
	{
		id: 3,
		date: new Date(),
		hour: '19:00',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphael',
			lastName: 'Mariétan',
		},
	},
	{
		id: 4,
		date: new Date(),
		hour: '19:00',
		guests: 2,
		remark: 'We dont have a lot of time',
		table: '',
		status: 'pending',
		user: {
			image: {
				alt: 'Jérémie Amstutz',
				url: 'https://waiter.fra1.digitaloceanspaces.com/b99afa49-92f3-457f-9a97-0d01a14c8c59',
			},
			firstName: 'Jérémie',
			lastName: 'Amstutz',
		},
	},
	{
		id: 5,
		date: new Date(),
		hour: '19:15',
		guests: 3,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: '',
			firstName: 'Sébastien',
			lastName: 'Hachemane',
		},
	},
	{
		id: 6,
		date: new Date(),
		hour: '19:00',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphael',
			lastName: 'Mariétan',
		},
	},
	{
		id: 7,
		date: new Date(),
		hour: '19:00',
		guests: 1,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: {
				alt: 'Luca Moessner',
				url: 'https://lh3.googleusercontent.com/a/AATXAJzPz4bpYidF0QwhVEGFm8p6FFTyUnkqfhjmfn1P=s96-c',
			},
			firstName: 'Luca',
			lastName: 'Moessner',
		},
	},
	{
		id: 8,
		date: new Date(),
		hour: '19:30',
		guests: 1,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: {
				alt: 'Luca Moessner',
				url: 'https://lh3.googleusercontent.com/a/AATXAJzPz4bpYidF0QwhVEGFm8p6FFTyUnkqfhjmfn1P=s96-c',
			},
			firstName: 'Luca',
			lastName: 'Moessner',
		},
	},
	{
		id: 9,
		date: new Date(),
		hour: '19:30',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphael',
			lastName: 'Mariétan',
		},
	},
	{
		id: 10,
		date: new Date(),
		hour: '19:00',
		guests: 2,
		remark: 'We dont have a lot of time',
		table: '',
		status: 'pending',
		user: {
			image: {
				alt: 'Jérémie Amstutz',
				url: 'https://waiter.fra1.digitaloceanspaces.com/b99afa49-92f3-457f-9a97-0d01a14c8c59',
			},
			firstName: 'Jérémie',
			lastName: 'Amstutz',
		},
	},
	{
		id: 11,
		date: new Date(),
		hour: '19:15',
		guests: 3,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: '',
			firstName: 'Sébastien',
			lastName: 'Hachemane',
		},
	},
	{
		id: 12,
		date: new Date(),
		hour: '19:00',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphael',
			lastName: 'Mariétan',
		},
	},
	{
		id: 13,
		date: new Date(),
		hour: '19:00',
		guests: 2,
		remark: 'We dont have a lot of time',
		table: '',
		status: 'pending',
		user: {
			image: {
				alt: 'Jérémie Amstutz',
				url: 'https://waiter.fra1.digitaloceanspaces.com/b99afa49-92f3-457f-9a97-0d01a14c8c59',
			},
			firstName: 'Jérémie',
			lastName: 'Amstutz',
		},
	},
	{
		id: 14,
		date: new Date(),
		hour: '19:15',
		guests: 3,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: '',
			firstName: 'Sébastien',
			lastName: 'Hachemane',
		},
	},
	{
		id: 15,
		date: new Date(),
		hour: '19:00',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphael',
			lastName: 'Mariétan',
		},
	},
	{
		id: 16,
		date: new Date(),
		hour: '19:45',
		guests: 1,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: {
				alt: 'Luca Moessner',
				url: 'https://lh3.googleusercontent.com/a/AATXAJzPz4bpYidF0QwhVEGFm8p6FFTyUnkqfhjmfn1P=s96-c',
			},
			firstName: 'Luca',
			lastName: 'Moessner',
		},
	},
	{
		id: 17,
		date: new Date(),
		hour: '19:30',
		guests: 1,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: {
				alt: 'Luca Moessner',
				url: 'https://lh3.googleusercontent.com/a/AATXAJzPz4bpYidF0QwhVEGFm8p6FFTyUnkqfhjmfn1P=s96-c',
			},
			firstName: 'Luca',
			lastName: 'Moessner',
		},
	},
	{
		id: 18,
		date: new Date(),
		hour: '19:30',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphael',
			lastName: 'Mariétan',
		},
	},
	{
		id: 19,
		date: new Date(),
		hour: '19:45',
		guests: 2,
		remark: 'We dont have a lot of time',
		table: '',
		status: 'pending',
		user: {
			image: {
				alt: 'Jérémie Amstutz',
				url: 'https://waiter.fra1.digitaloceanspaces.com/b99afa49-92f3-457f-9a97-0d01a14c8c59',
			},
			firstName: 'Jérémie',
			lastName: 'Amstutz',
		},
	},
	{
		id: 20,
		date: new Date(),
		hour: '19:15',
		guests: 3,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: '',
			firstName: 'Sébastien',
			lastName: 'Hachemane',
		},
	},
	{
		id: 21,
		date: new Date(),
		hour: '19:00',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphael',
			lastName: 'Mariétan',
		},
	},
	{
		id: 22,
		date: new Date(),
		hour: '19:45',
		guests: 2,
		remark: 'We dont have a lot of time',
		table: '',
		status: 'pending',
		user: {
			image: {
				alt: 'Jérémie Amstutz',
				url: 'https://waiter.fra1.digitaloceanspaces.com/b99afa49-92f3-457f-9a97-0d01a14c8c59',
			},
			firstName: 'Jérémie',
			lastName: 'Amstutz',
		},
	},
	{
		id: 23,
		date: new Date(),
		hour: '19:15',
		guests: 3,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: '',
			firstName: 'Sébastien',
			lastName: 'Hachemane',
		},
	},
	{
		id: 24,
		date: new Date(),
		hour: '19:45',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphael',
			lastName: 'Mariétan',
		},
	},
	{
		id: 25,
		date: new Date(),
		hour: '19:45',
		guests: 1,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: {
				alt: 'Luca Moessner',
				url: 'https://lh3.googleusercontent.com/a/AATXAJzPz4bpYidF0QwhVEGFm8p6FFTyUnkqfhjmfn1P=s96-c',
			},
			firstName: 'Luca',
			lastName: 'Moessner',
		},
	},
	{
		id: 26,
		date: new Date(),
		hour: '19:30',
		guests: 1,
		remark: '',
		table: '',
		status: 'accepted',
		user: {
			image: {
				alt: 'Luca Moessner',
				url: 'https://lh3.googleusercontent.com/a/AATXAJzPz4bpYidF0QwhVEGFm8p6FFTyUnkqfhjmfn1P=s96-c',
			},
			firstName: 'Luca',
			lastName: 'Moessner',
		},
	},
	{
		id: 27,
		date: new Date(),
		hour: '19:30',
		guests: 3,
		remark: '',
		table: '',
		status: 'arrived',
		user: {
			image: {
				alt: 'Raphaël Mariétan',
				url: 'https://lh3.googleusercontent.com/a/AATXAJx2hwIxjxB1KpMMTDqtCKtw1CBIOhoH8xKDChc0=s96-c',
			},
			firstName: 'Raphaël',
			lastName: 'Mariétan',
		},
	},
]

function BookingCard({ booking }) {
	const { user } = booking

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '1rem',
				borderRadius: '2rem',
				cursor: 'pointer',
			}}
		>
			<div
				style={{
					width: '4rem',
					height: '4rem',
					borderRadius: '50%',
					overflow: 'hidden',
				}}
			>
				<Image
					alt={user.image.alt}
					src={user.image.url || '/images/defaults/item.png'}
					width={64}
					height={64}
				/>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '0.25rem',
				}}
			>
				<h3 style={{ margin: 0, fontSize: '1.125rem' }}>
					{booking.user.firstName} {booking.user.lastName}
				</h3>
				<div
					style={{
						color: '#666',
						fontFamily: 'Rubik',
					}}
				>
					{capitalizeFirstLetter(booking.status)} • {booking.guests}{' '}
					pax • T2
				</div>
			</div>
		</div>
	)
}

function BookingList({ slot, bookings }) {
	slot.seated = bookings.reduce(
		(total, booking) => (total += booking.guests),
		0,
	)
	slot.active = slot.hour === '19:15'

	return (
		<div>
			<h2
				style={{
					margin: 0,
					color: slot.active ? 'var(--color-danger)' : '#222',
				}}
			>
				{slot.hour}
			</h2>
			<p style={{ margin: '0 0 1rem' }}>
				Seated: {slot.seated}/{slot.capacity}
			</p>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns:
						'repeat(auto-fill, minmax(18rem, 1fr))',
					gap: '1.5rem',
				}}
			>
				{bookings.map((booking) => (
					<BookingCard booking={booking} key={booking.id} />
				))}
			</div>
		</div>
	)
}

export default function BookingsModal({ onClose }) {
	return (
		<Modal title="Bookings" onClose={onClose} style={{ maxWidth: '80rem' }}>
			<header className={classes.header}>
				<div style={{ display: 'flex', gap: '0.5rem' }}>
					<button style={{ minWidth: 0, width: '3rem', padding: 0 }}>
						<ChevronIcon direction="left" />
					</button>
					<button style={{ flex: 1 }}>
						{new Date().toDateString()}
					</button>
					{/* <button>Lunch</button> */}
					<button style={{ minWidth: 0, width: '3rem', padding: 0 }}>
						<ChevronIcon direction="right" />
					</button>
				</div>
				<div
					style={{
						display: 'flex',
						gap: '0.5rem',
					}}
				>
					<button style={{ flex: 1, minWidth: 'fit-content' }}>
						Edit settings
					</button>
					<button
						className="secondary"
						style={{
							flex: 1,
							minWidth: 'fit-content',
						}}
					>
						New booking
					</button>
				</div>
			</header>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '3rem',
				}}
			>
				{[...groupBy(BOOKINGS, (booking) => booking.hour)].map(
					([hour, bookings]) => (
						<BookingList
							slot={{ hour, capacity: 20 }}
							bookings={bookings}
							key={hour}
						/>
					),
				)}
			</div>
		</Modal>
	)
}

{
	/* <header
				style={{
					display: 'flex',
					gap: '2rem',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div style={{ fontSize: '1.125rem' }}>Booked</div>
					<div style={{ fontSize: '2rem' }}>144/192</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div style={{ fontSize: '1.125rem' }}>Seated</div>
					<div style={{ fontSize: '2rem' }}>10/144</div>
				</div>
			</header> */
}
