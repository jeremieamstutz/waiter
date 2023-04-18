import Stripe from 'stripe'
import { User } from 'db/models'
import statusCodes from 'utils/statusCodes'
import { getServerSession } from 'next-auth'
import { authOptions } from 'pages/api/auth/[...nextauth]'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET': {
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

			const paymentMethods = await stripe.paymentMethods.list({
				customer: session.user.stripeCustomerId,
				type: 'card',
			})

			return res.status(statusCodes.ok).json(paymentMethods.data)
		}

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

			if (!user.stripeCustomerId) {
				const customer = await stripe.customers.create({
					id: user.id,
					email: user.email,
					name: user.fullName,
					phone: user.phone,
				})
				user.stripeCustomerId = customer.id
				await user.save()
			}

			const setupIntent = await stripe.setupIntents.create({
				customer: user.stripeCustomerId,
				payment_method_types: ['card'],
			})

			// const customer = await stripe.customers.update(user.stripeCustomerId, {invoice_settings.default_payment_method: setupIntent.id})

			return res
				.status(statusCodes.ok)
				.json({ clientSecret: setupIntent.client_secret })
		}

		default: {
			res.status(statusCodes.methodNotAllowed).end()
			break
		}
	}
}
