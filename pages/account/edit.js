import { useSession } from 'next-auth/react'

import Container from 'components/layout/container'
import UserForm from 'components/user/user-form'
import { Ring } from 'components/ui/spinner'
import useSWR from 'swr'
import Header from 'components/layout/header'

export default function EditUserPage() {
	const { data: session } = useSession()
	const {
		data: { user },
	} = useSWR(session?.user ? `/api/users/${session?.user.id}` : null, {
		fallbackData: { user: {} },
	})

	return (
		<>
			<Container>
				<h1>Edit user</h1>
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
			</Container>
			<Header />
		</>
	)
}
