import { getServerSession } from 'next-auth'
import Stripe from 'stripe'

import { User } from 'db/models'

import statusCodes from 'utils/statusCodes'
import { authOptions } from 'pages/api/auth/[...nextauth]'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
		case 'POST': {
			const session = await getServerSession(req, res, authOptions)

			if (!session) {
				return res
					.status(statusCodes.unauthorized)
					.json({ status: 'error', message: 'You are not connected' })
			}

			const user = await User.findOne({ where: { id: session.user.id } })

			if (!user) {
				return res
					.status(statusCodes.badRequest)
					.json({ status: 'error', message: 'No user' })
			}

			const paymentMethods = await user.getPaymentMethods({
				where: { id: body.method },
			})

			console.log(paymentMethods)
			// await user.save()

			return res.status(statusCodes.ok).json({})
		}

		default: {
			return res.status(statusCodes.methodNotAllowed).end()
		}
	}
}
