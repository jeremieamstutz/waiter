import statusCodes from 'utils/statusCodes'
import Stripe from 'stripe'
import { User } from 'db/models'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

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

			const paymentMethods = await stripe.paymentMethods.list({
				customer: session.user.stripeCustomerId,
				type: 'card',
			})

			if (paymentMethods.data.length < 1) {
				return
			}

			const paymentIntent = await stripe.paymentIntents.create({
				amount: body.amount,
				currency: 'usd',
				customer: session.user.stripeCustomerId,
				payment_method: paymentMethods.data[0].id,
				off_session: true,
				confirm: true,
			})

			return res
				.status(statusCodes.ok)
				.json({ clientSecret: paymentIntent.client_secret })
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
