import Container from 'components/layout/container'
import Header from 'components/layout/header'
import { Ring } from 'components/ui/spinner'
import UserForm from 'components/user/user-form'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export default function NewUserPage() {
	const { data: session } = useSession()
	const {
		data: { user },
	} = useSWR(session?.user ? `/api/users/${session?.user.id}` : null, {
		fallbackData: { user: {} },
	})

	return (
		<>
			<Container>
				<h1>New user</h1>
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
					<UserForm user={user} isNewUser/>
				)}
			</Container>
			<Header />
		</>
	)
}
