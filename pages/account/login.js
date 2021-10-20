import { getProviders, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import classes from 'styles/login.module.css'

export default function LoginPage({ providers }) {
	const router = useRouter()
	return (
		<div className={classes.container}>
			<div>
				{/* <img
					src="/android-chrome-512x512.png"
					width="128"
					height="128"
					style={{ background: 'none' }}
				/> */}
				<h1 className={classes.title}>Waiter</h1>
			</div>
			<div className={classes.list}>
				{Object.values(providers).map((provider) => (
					<button
						key={provider.name}
						onClick={() =>
							signIn(provider.id, {
								callbackUrl: router.query.callbackUrl,
							})
						}
					>
						Log in with {provider.name}
					</button>
				))}
			</div>
			<p className={classes.details}>
				It doesn&apos;t matter if you already have a Waiter account or not
			</p>
		</div>
	)
}

export async function getServerSideProps() {
	return {
		props: {
			providers: await getProviders(),
		},
	}
}
