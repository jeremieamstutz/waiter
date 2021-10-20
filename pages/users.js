import Image from 'next/image'

import { getAllUsers } from 'utils/db'

export default function UsersPage({ users }) {
	return (
		<>
			<div className="container">
				<h1>Users</h1>
				<div>
					{users.map((user, index) => (
						<div key={index}>
							<h2 style={{margin: 0}}>{user.name}</h2>
							<p style={{margin: 0}}>{user.email}</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps() {
	const users = await getAllUsers()

	return {
		props: {
			users: JSON.parse(JSON.stringify(users)),
		},
	}
}
