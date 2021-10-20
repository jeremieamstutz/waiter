import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
	],
	database: {
		type: 'postgres',
		host: 'ec2-54-72-155-238.eu-west-1.compute.amazonaws.com',
		port: 5432,
		username: 'wljmdibvoxmcey',
		password:
			'e8b359a0c3f6207781cc992aee8d26986b18a4e36ef5964083cd8e29eb2e7f17',
		database: 'd26ud75pmvi5cc',
		extra: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
	},
	pages: {
		signIn: '/account/login',
		signOut: '/account/logout',
		error: '/account/error',
		newUser: '/account/new-user'
	},
	callbacks: {
		session: async (session, user) => {
			session.user.id = user.id
			return Promise.resolve(session)
		},
	},
})
