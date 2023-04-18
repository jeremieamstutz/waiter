import { getServerSession } from 'next-auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { User } from 'db/models'

import Layout from 'components/layout/layout'
import EditUserForm from 'components/user/edit-user-form'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default function NewUserPage({ user }) {
	const router = useRouter()
	const { t } = useTranslation()
	const { callbackUrl = '/' } = router.query

	return (
		<Layout>
			<h1>New user</h1>
			<div
				style={{
					maxWidth: '50rem',
					width: '100%',
					alignSelf: 'center',
				}}
			>
				<EditUserForm
					user={user}
					onSubmit={() => router.push(callbackUrl)}
				/>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						margin: '1rem 0',
					}}
				>
					<button
						type="button"
						onClick={() => router.push(callbackUrl)}
					>
						{t('common:misc.actions.skip')}
					</button>
					<button type="submit" form="user" className="secondary">
						{t('common:misc.actions.save')}
					</button>
				</div>
			</div>
		</Layout>
	)
}

export async function getServerSideProps({ req, res, locale }) {
	const session = await getServerSession(req, res, authOptions)

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	const user = await User.findOne({ where: { id: session.user.id } })

	if (!user) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			user: JSON.parse(JSON.stringify(user)),
			...(await serverSideTranslations(locale, ['common', 'user'])),
		},
	}
}
