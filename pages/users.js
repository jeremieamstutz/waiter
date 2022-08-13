import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'

import { getAllUsers } from 'pages/api/users'

import Container from 'components/layout/container'
import Main from 'components/layout/main'
import Header from 'components/layout/header'
import Footer from 'components/layout/footer'

export default function UsersPage({ users }) {
	return (
		<>
			<Container>
				<Header />
				<Main>
					<h1>Users</h1>
					<div>
						{users.map((user, index) => (
							<div key={index}>
								<h2 style={{ margin: 0 }}>{user.name}</h2>
								<p style={{ margin: 0 }}>{user.email}</p>
							</div>
						))}
					</div>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ locale }) {
	const users = await getAllUsers()

	return {
		props: {
			users: users,
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}
