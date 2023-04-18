import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'

import Adapter from 'utils/adapter'

export const authOptions = {
	providers: [
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: 'Waiter <noreply@waiter.so>',
			maxAge: 15 * 60,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_ID,
			clientSecret: process.env.TWITTER_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	adapter: Adapter(),
	callbacks: {
		session: (session) => session,
	},
	pages: {
		signIn: '/login',
		signOut: '/logout',
		error: '/login',
		verifyRequest: '/email-sent',
		newUser: '/users/new',
	},
}

export default NextAuth(authOptions)
