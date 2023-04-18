import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Footer from 'components/layout/footer'

import Input from 'components/form/input'

import classes from 'styles/login.module.css'
import track from 'utils/track'

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

function ButtonProvider({ provider }) {
	const router = useRouter()
	const { t } = useTranslation()

	const [isLoading, setIsLoading] = useState(false)

	return (
		<button
			onClick={() => {
				setIsLoading(true)
				signIn(provider.id, {
					callbackUrl:
						router.query.callbackUrl ??
						process.env.NEXT_PUBLIC_DOMAIN,
				})
				track.event({
					event_category: 'auth',
					event_name: 'login',
					event_label: provider.name.toLowerCase(),
				})
			}}
			style={{
				color: 'white',
				background: provider.background,
			}}
		>
			{!isLoading ? provider.name : t('common:misc.actions.loading')}
		</button>
	)
}

export default function LoginPage() {
	const router = useRouter()
	const { t } = useTranslation()

	const { error } = router.query

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
			background: '#dc4a39',
		},
		facebook: {
			id: 'facebook',
			name: 'Facebook',
			type: 'oauth',
			signinUrl: 'http://localhost:3000/api/auth/signin/facebook',
			callbackUrl: 'http://localhost:3000/api/auth/callback/facebook',
			background: '#2e4c96',
		},
		twitter: {
			id: 'twitter',
			name: 'Twitter',
			type: 'oauth',
			signinUrl: 'http://localhost:3000/api/auth/signin/twitter',
			callbackUrl: 'http://localhost:3000/api/auth/callback/twitter',
			background: '#56aaee',
		},
	}

	return (
		<>
			<Head>
				<title>{t('auth:pages.login.meta.title')}</title>
			</Head>
			<Container>
				<Header />
				<div
					style={{
						flex: 1,
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: '10vh',
					}}
				>
					<div
						style={{
							width: '100%',
							maxWidth: '30rem',
							borderRadius: '1rem',
						}}
					>
						<h1
							style={{
								textAlign: 'center',
								marginBottom: '1.5rem',
							}}
						>
							{t('auth:pages.login.title')}
						</h1>
						<div className={classes.list}>
							<Formik
								initialValues={{ email: '' }}
								validationSchema={object({
									email: string()
										.email('It must be a valid email')
										.required('Your email is required'),
								})}
								onSubmit={({ email }) => {
									setLoading(true)
									signIn('email', {
										email,
										callbackUrl:
											router.query.callbackUrl ??
											process.env.NEXT_PUBLIC_DOMAIN,
									})
									track.event({
										event_category: 'auth',
										event_name: 'login',
										event_label: 'email',
									})
								}}
							>
								<Form
									style={{
										display: 'flex',
										flexDirection: 'row',
										gap: '0.5rem',
									}}
								>
									<Input
										type="text"
										name="email"
										placeholder="Email"
									/>
									<button
										type="submit"
										className="secondary"
										style={{ padding: '0 2rem' }}
									>
										{loading ? (
											<span>
												{t(
													'common:misc.actions.loading',
												)}
											</span>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										)}
									</button>
								</Form>
							</Formik>
							<div
								style={{
									fontSize: '1.25rem',
									textAlign: 'center',
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={24}
									height={24}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
									/>
								</svg>
							</div>
							{Object.values(providers).map(
								(provider) =>
									provider.id !== 'email' && (
										<ButtonProvider
											key={provider.name}
											provider={provider}
										/>
									),
							)}
						</div>
						{error && (
							<p
								className={classes.details}
								style={{ color: 'red' }}
							>
								{errors[error] ?? errors.default}
							</p>
						)}
					</div>
				</div>
				<Footer />
			</Container>
		</>
	)
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'auth'])),
		},
	}
}
