import Spinner from 'components/ui/spinner'
import { getProviders, getCsrfToken, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import classes from 'styles/login.module.css'

const errors = {
	Signin: 'Try signing with a different account.',
	OAuthSignin: 'Try signing with a different account.',
	OAuthCallback: 'Try signing with a different account.',
	OAuthCreateAccount: 'Try signing with a different account.',
	EmailCreateAccount: 'Try signing with a different account.',
	Callback: 'Try signing with a different account.',
	OAuthAccountNotLinked:
		'To confirm your identity, sign in with the same account you used originally.',
	EmailSignin: 'Check your email address.',
	CredentialsSignin:
		'Sign in failed. Check the details you provided are correct.',
	default: 'Unable to sign in.',
}

export default function LoginPage() {
	const router = useRouter()

	const { error } = router.query

	// const [providers, setProviders] = useState({})
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)

	const providers = {
		email: {
			id: 'email',
			name: 'Email',
			type: 'email',
			signinUrl: 'http://localhost:3000/api/auth/signin/email',
			callbackUrl: 'http://localhost:3000/api/auth/callback/email',
		},
		google: {
			id: 'google',
			name: 'Google',
			type: 'oauth',
			signinUrl: 'http://localhost:3000/api/auth/signin/google',
			callbackUrl: 'http://localhost:3000/api/auth/callback/google',
		},
		facebook: {
			id: 'facebook',
			name: 'Facebook',
			type: 'oauth',
			signinUrl: 'http://localhost:3000/api/auth/signin/facebook',
			callbackUrl: 'http://localhost:3000/api/auth/callback/facebook',
		},
		twitter: {
			id: 'twitter',
			name: 'Twitter',
			type: 'oauth',
			signinUrl: 'http://localhost:3000/api/auth/signin/twitter',
			callbackUrl: 'http://localhost:3000/api/auth/callback/twitter',
		},
	}

	// useEffect(() => {
	// async function fetchCsrfToken() {
	// 	setCsrfToken(await getCsrfToken())
	// }
	// fetchCsrfToken()

	// async function fetchProviders() {
	// 	setProviders(await getProviders())
	// }
	// fetchProviders()
	// }, [])

	return (
		<div className={classes.container}>
			{loading && <Spinner />}
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
				<form
					onSubmit={(event) => {
						event.preventDefault()
						setLoading(true)
						signIn('email', {
							email,
							callbackUrl:
								router.query.callbackUrl ??
								process.env.NEXT_PUBLIC_DOMAIN,
						})
					}}
				>
					<input
						autoFocus
						type="email"
						name="email"
						placeholder="Email"
						onChange={(event) => setEmail(event.target.value)}
					/>
					<button type="submit">Sign in with Email</button>
				</form>
				<div style={{ borderBottom: '1px solid #ccc' }} />
				{Object.values(providers).map(
					(provider) =>
						provider.id !== 'email' && (
							<button
								key={provider.name}
								onClick={() => {
									setLoading(true)
									signIn(provider.id, {
										callbackUrl:
											router.query.callbackUrl ??
											process.env.NEXT_PUBLIC_DOMAIN,
									})
								}}
							>
								Log in with {provider.name}
							</button>
						),
				)}
			</div>
			{!error ? (
				<p className={classes.details}>
					It doesn&apos;t matter if you already have a Waiter account
					or not
				</p>
			) : (
				<p className={classes.details} style={{ color: 'red' }}>
					{errors[error] ?? errors.default}
				</p>
			)}
		</div>
	)
}
