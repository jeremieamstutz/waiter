import { buffer } from 'micro'
import Stripe from 'stripe'

import { PaymentMethod } from 'db/models'
import statusCodes from 'utils/statusCodes'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'POST': {
			const reqBuffer = await buffer(req)
			const signature = req.headers['stripe-signature']

			const event = stripe.webhooks.constructEvent(
				reqBuffer,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET,
			)

			switch (event.type) {
				case 'setup_intent.succeeded': {
					// const paymentMethod = await PaymentMethod.create({
					// 	id: event.data.object.payment_method,
					// 	stripeCustomerId: event.data.object.customer,
					// })
					// break
				}
				case 'payment_intent.created': {
					break
				}
				case 'payment_intent.canceled': {
					break
				}
				case 'payment_intent.partially_funded': {
					break
				}
				case 'payment_intent.payment_failed': {
					break
				}
				case 'payment_intent.processing': {
					break
				}
				case 'payment_intent.requires_action': {
					break
				}
				case 'payment_intent.succeeded': {
					const paymentIntent = event.data.object
					// Create the order

					// Send confirmation email

					// Send push notification to
					break
				}
				default: {
					console.log(`Unhandled event type: ${event.type}`)
				}
			}

			return res.status(statusCodes.ok).json({ received: true })
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
