import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getServerSession } from 'next-auth'

import { getAllUsers } from 'pages/api/users'
import { authOptions } from './api/auth/[...nextauth]'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Footer from 'components/layout/footer'

import UserCard from 'components/user/user-card'
import UserModal from 'components/user/user-modal'

export default function UsersPage({ users }) {
	const router = useRouter()
	return (
		<>
			{router.query.user && (
				<UserModal
					user={
						users.filter((user) => user.id === router.query.user)[0]
					}
					onClose={() => router.back()}
				/>
			)}
			<Container>
				<Header />
				<Main>
					<h1>Users ({users.length})</h1>
					<div
						style={{
							marginTop: '1rem',
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(25rem, 1fr))',
							gap: '1.5rem',
						}}
					>
						{users.map((user) => (
							<UserCard user={user} key={user.id} />
						))}
					</div>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ req, res, locale }) {
	const users = await getAllUsers()
	const session = await getServerSession(req, res, authOptions)

	if (session?.user?.role === 'admin') {
		return {
			props: {
				users: JSON.parse(JSON.stringify(users)),
				...(await serverSideTranslations(locale, ['common'])),
			},
		}
	} else {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
}
