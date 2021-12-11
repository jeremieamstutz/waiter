import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'

import Adapter from 'utils/adapter'

export default NextAuth({
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
	// database: {
	// 	type: 'postgres',
	// 	host: 'ec2-54-72-155-238.eu-west-1.compute.amazonaws.com',
	// 	port: 5432,
	// 	username: 'wljmdibvoxmcey',
	// 	password:
	// 		'e8b359a0c3f6207781cc992aee8d26986b18a4e36ef5964083cd8e29eb2e7f17',
	// 	database: 'd26ud75pmvi5cc',
	// 	extra: {
	// 		ssl: {
	// 			rejectUnauthorized: false,
	// 		},
	// 	},
	// },
	adapter: Adapter(),
	callbacks: {
		session: (session) => session,
	},
	pages: {
		signIn: '/account/login',
		signOut: '/account/logout',
		error: '/account/login',
		verifyRequest: '/account/email-sent',
		newUser: '/account/new-user',
	},
})
