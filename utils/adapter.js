import { query } from './db'

export default function Adapter(client, options = {}) {
	return {
		async createUser(user) {
			console.log('createUser ', user)
			const result = await query(
				`
            INSERT INTO users 
                (name, email, email_verified, image)
            VALUES
                ($1, $2, $3, $4)
			RETURNING *`,
				[
					user.name,
					user.email,
					user.emailVerified?.toString() ?? null,
					user.image,
				],
			)
			return result.rows[0]
		},
		// 		async getUser(...props) {
		// 			console.log('getUserById ', ...props)
		// 		},
		// 		async updateUser(...props) {
		// 			console.log('updateUser ', props)
		// 		},
		// 		async deleteUser(...props) {
		// 			console.log('deleteUser ', props)
		// 		},
		// async getUser(id) {
		// 	console.log('getUserById ', id)
		// 	const result = await query(
		// 		`
		//         SELECT * FROM users
		//         WHERE users.id = $1`,
		// 		[id],
		// 	)
		// 	return result.rows[0]
		// },
		async getUserByEmail(email) {
			console.log('getUserByEmail ', email)
			const result = await query(
				`
                SELECT users.* FROM users
                WHERE email = $1`,
				[email],
			)
			return result.rows[0]
		},
		async getUserByAccount({ provider, providerAccountId }) {
			console.log('getUserByAccount ', provider, providerAccountId)
			const result = await query(
				`
                SELECT users.* FROM accounts
                JOIN users ON users.id = accounts.user_id
                WHERE accounts.provider = $1 AND accounts.provider_account_id = $2`,
				[provider, providerAccountId],
			)
			return result.rows[0]
		},
		async updateUser(user) {
			console.log('updateUser ', user)
			const { id, emailVerified } = user
			const result = await query(
				`
		        UPDATE users
		        SET email_verified = $2
		        WHERE id = $1
				RETURNING *`,
				[id, emailVerified],
			)
			return result.rows[0]
			// return await query(
			// 	`
			//     UPDATE users
			//     SET name = $2, email = $3, email_verified = $4, image = $5
			//     WHERE users.id = $1`,
			// 	[
			// 		user.id,
			// 		user.name,
			// 		user.email,
			// 		user.emailVerified?.toString() ?? null,
			// 		user.image,
			// 	],
			// )
		},
		async deleteUser(userId) {
			console.log('deleteUser ', user)
			return await query(
				`
		        DELETE FROM users
		        WHERE users.id = $1`,
				[userId],
			)
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
			return await query(
				`
                INSERT INTO accounts
                    (user_id, type, provider, provider_account_id, refresh_token, access_token, expires_at, token_type, id_token, scope, oauth_token_secret, oauth_token, session_state)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
				RETURNING user_id as "userId", type, provider, provider_account_id as "providerAccountId", refresh_token, access_token, expires_at, token_type, id_token, scope, oauth_token_secret, oauth_token, session_state`,
				[
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
				],
			)
		},
		async unlinkAccount(account) {
			console.log('NOT IMPLEMENTED unlinkAccount', account)
			// return await query(
			// 	`
			// DELETE FROM account
			// WHERE accounts.provider = $1 AND accounts.provider_account_id = $2`,
			// 	[provider, id],
			// )
		},
		async createSession(session) {
			console.log('createSession', session)
			const { sessionToken, userId, expires } = session
			const result = await query(
				`
		    INSERT INTO sessions
		        (session_token, user_id, expires_at)
		    VALUES
		        ($1, $2, $3)
			RETURNING session_token AS "sessionToken", expires_at as "expires", user_id as"userId"`,
				[sessionToken, userId, expires],
			)
			return result.rows[0]
		},
		async getSessionAndUser(sessionToken) {
			console.log('getSessionAndUser ', sessionToken)
			const session = (
				await query(
					`
		    SELECT session_token AS "sessionToken", expires_at as "expires", user_id as"userId" 
			FROM sessions 
			WHERE sessions.session_token = $1`,
					[sessionToken],
				)
			).rows[0]

			if (!session) return null

			const user = (
				await query(
					`
		        SELECT * FROM users
		        WHERE users.id = $1`,
					[session.userId],
				)
			).rows[0]

			return {
				session,
				user,
			}
		},
		async updateSession(session) {
			console.log('updateSession ', session)
			const { sessionToken, expires } = session
			return await query(
				`
			    UPDATE sessions
			    SET expires_at = $2
			    WHERE sessions.session_token = $1`,
				[sessionToken, expires],
			)
		},
		async deleteSession(sessionToken) {
			console.log('deleteSession', sessionToken)
			return await query(
				`
		    DELETE FROM sessions
		    WHERE sessions.session_token = $1`,
				[sessionToken],
			)
		},
		async createVerificationToken(verificationToken) {
			console.log('createVerificationToken', verificationToken)
			const { identifier, token, expires } = verificationToken
			const result = await query(
				`
			INSERT INTO verification_tokens
				(identifier, token, expires_at)
			VALUES
				($1, $2, $3)
			RETURNING *
			`,
				[identifier, token, expires],
			)
			return result.rows[0]
		},
		async useVerificationToken(verificationToken) {
			const { identifier, token } = verificationToken

			console.log('useVerificationToken', identifier, token)
			const result = await query(
				`
			DELETE FROM verification_tokens
			WHERE token = $1 AND identifier = $2
			RETURNING identifier, token, expires_at AS expires
			`,
				[token, identifier],
			)
			console.log(result.rows[0])
			return result.rows[0]
		},
	}
}
