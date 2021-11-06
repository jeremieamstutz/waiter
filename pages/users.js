import Image from 'next/image'

import { getAllUsers } from 'pages/api/users'
import Container from 'components/layout/container'

export default function UsersPage({ users }) {
	return (
		<>
			<Container>
				<h1>Users</h1>
				<div>
					{users.map((user, index) => (
						<div key={index}>
							<h2 style={{margin: 0}}>{user.name}</h2>
							<p style={{margin: 0}}>{user.email}</p>
						</div>
					))}
				</div>
			</Container>
		</>
	)
}

export async function getServerSideProps() {
	const users = await getAllUsers()

	return {
		props: {
			users: users,
		},
	}
}
