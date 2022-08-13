import { useSession } from 'next-auth/react'

import Container from 'components/layout/container'
import UserForm from 'components/user/user-form'
import { Ring } from 'components/ui/spinner'
import useSWR from 'swr'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Footer from 'components/layout/footer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function SettingsPage() {
	const { data: session } = useSession()
	const {
		data: { user },
	} = useSWR(session?.user ? `/api/users/${session?.user.id}` : null, {
		fallbackData: { user: {} },
	})

	return (
		<>
			<Container>
				<Header />
				<Main>
					<h1>Settings</h1>
					{!user.id ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flex: 1,
							}}
						>
							<Ring />
						</div>
					) : (
						<UserForm user={user} />
					)}
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	}
}
