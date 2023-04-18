import { Account, Session, User, VerificationToken } from 'db/models'
import { getUser } from 'pages/api/users/[userId]'
import { query, sql } from './db'

export default function Adapter(client, options = {}) {
	return {
		async createUser(user) {
			console.log('createUser ', user)
			const { name, email, emailVerified, image } = user
			const [firstName, lastName] = name.split(' ')
			return User.create({
				firstName,
				lastName,
				email,
				emailVerified,
				image,
			})
		},
		async getUser(id) {
			console.log('getUserById ', id)
			return User.findOne({ where: { id } })
		},
		async updateUser(user) {
			console.log('updateUser ', user)
			return User.update(user, { where: { id: user.id } })
		},
		async getUserByEmail(email) {
			console.log('getUserByEmail ', email)
			return User.findOne({ where: { email } })
		},
		async getUserByAccount({ provider, providerAccountId }) {
			console.log('getUserByAccount ', provider, providerAccountId)
			const account = await Account.findOne({
				where: { provider, providerAccountId },
			})

			if (!account) return null

			return User.findOne({ where: { id: account.userId } })
		},
		async updateUser(user) {
			console.log('updateUser ', user)
			return User.update(user, { where: { id: user.id } })
		},
		async deleteUser(id) {
			console.log('deleteUser ', id)
			return User.destroy({ where: { id } })
		},
		async linkAccount(account) {
			console.log('linkAccount', account)
			const {
				userId,
				type,
				provider,
				providerAccountId,
				refresh_token,
				access_token,
				expires_at,
				token_type,
				id_token,
				scope,
				oauth_token_secret,
				oauth_token,
				session_state,
			} = account
			return Account.create({
				userId: userId,
				type: type,
				provider: provider,
				providerAccountId: providerAccountId,
				refreshToken: refresh_token,
				accessToken: access_token,
				expiresAt: expires_at,
				tokenType: token_type,
				idToken: id_token,
				scope: scope,
				sessionState: session_state,
				oauthTokenSecret: oauth_token_secret,
				oauthToken: oauth_token,
			})
		},
		async unlinkAccount(account) {
			console.log('unlinkAccount', account)
			const { provider, providerAccountId } = account
			return Account.destroy({ where: { provider, providerAccountId } })
		},
		async createSession(session) {
			console.log('createSession', session)
			return await Session.create(session)
		},
		async getSessionAndUser(sessionToken) {
			console.log('getSessionAndUser ', sessionToken)

			const session = await Session.findOne({
				where: {
					sessionToken,
				},
			})

			if (!session) return null

			if (new Date() > session.expires) {
				await Session.destroy({ where: { sessionToken } })
				return null
			}

			const user = await User.findOne({ where: { id: session.userId } })

			return {
				session,
				user,
			}
		},
		async updateSession(session) {
			console.log('updateSession ', session)
			return await Session.update(session, {
				where: { sessionToken: session.sessionToken },
			})
		},
		async deleteSession(sessionToken) {
			console.log('deleteSession', sessionToken)
			return await Session.destroy({ where: { sessionToken } })
		},
		async createVerificationToken(verificationToken) {
			console.log('createVerificationToken', verificationToken)

			return VerificationToken.create(verificationToken)
		},
		async useVerificationToken(verificationToken) {
			console.log('useVerificationToken', verificationToken)

			const verificationRequest = VerificationToken.findOne({
				where: verificationToken,
			})

			if (
				verificationRequest &&
				new Date() > verificationRequest.expires
			) {
				await verificationRequest.destroy()
				return null
			}
			return verificationRequest
		},
	}
}
