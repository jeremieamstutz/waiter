import statusCodes from 'utils/statusCodes'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'POST': {
			return res.status(statusCodes.ok).json()
		}
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
