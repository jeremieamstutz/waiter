import Stripe from 'stripe'
import { User } from 'db/models'
import statusCodes from 'utils/statusCodes'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async function handler(req, res) {
	const {
		method,
		query: { methodId },
	} = req

	switch (method) {
		case 'DELETE': {
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

			const { data: paymentMethods } = await stripe.paymentMethods.list({
				customer: session.user.stripeCustomerId,
				type: 'card',
			})

			if (
				paymentMethods
					.map((paymentMethod) => paymentMethod.id)
					.includes(methodId)
			) {
				await stripe.paymentMethods.detach(methodId)
			}

			return res.status(statusCodes.ok).json({ status: 'Deleted' })
		}

		default: {
			return res.status(statusCodes.methodNotAllowed).end()
		}
	}
}
