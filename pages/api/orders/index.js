import { getServerSession } from 'next-auth'
import Stripe from 'stripe'

import statusCodes from 'utils/statusCodes'
import { Cart, Order, User } from 'db/models'
import sequelize from 'db'

import { authOptions } from '../auth/[...nextauth]'

const stripe = Stripe(process.env.STRIPE_SECRET)

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
		case 'GET': {
			await sequelize.sync()
			const carts = await Cart.findAll()
			console.log(carts)
			const orders = await Order.findAll()
			return res.status(statusCodes.ok).json(orders)
		}
		case 'POST':
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
				return res
					.status(statusCodes.badRequest)
					.json({ status: 'error', message: 'No payment method' })
			}

			const total = body.items.reduce(
				(total, item) => total + item.price * item.quantity,
				0,
			)

			const paymentIntent = await stripe.paymentIntents.create({
				amount: Math.round(total * 100),
				currency: 'usd',
				customer: session.user.stripeCustomerId,
				payment_method: paymentMethods.data[0].id,
				off_session: true,
				confirm: true,
			})

			return res.status(statusCodes.ok).json({})

			// const session = await stripe.checkout.sessions.create({
			// 	mode: 'payment',
			// 	payment_method_types: ['card'],
			// 	line_items: order.items.map((item) => ({
			// 		price_data: {
			// 			currency: 'chf',
			// 			unit_amount: Math.round(item.price * 100),
			// 			product_data: {
			// 				name: item.name,
			// 				description: item.description,
			// 				images: [item.image.url],
			// 			},
			// 		},
			// 		quantity: item.quantity,
			// 	})),
			// 	success_url: baseUrl + '?status=success',
			// 	cancel_url: baseUrl + '?status=cancel',
			// })

			// // Create a new ride
			// const ride = new Ride({
			// 	pilot: pilot.id,
			// 	passenger: passenger.id,
			// 	amount: amount,
			// 	currency: currency,
			//   });
			//   // Save the ride
			//   await ride.save();

			//   // Create a Payment Intent and set its destination to the pilot's account
			//   const paymentIntent = await stripe.paymentIntents.create({
			// 	amount: ride.amount,
			// 	currency: ride.currency,
			// 	description: config.appName,
			// 	statement_descriptor: config.appName,
			// 	// The destination parameter directs the transfer of funds from platform to pilot
			// 	transfer_data: {
			// 	  // Send the amount for the pilot after collecting a 20% platform fee:
			// 	  // the `amountForPilot` method simply computes `ride.amount * 0.8`
			// 	  amount: ride.amountForPilot(),
			// 	  // The destination of this Payment Intent is the pilot's Stripe account
			// 	  destination: pilot.stripeAccountId,
			// 	},
			//   });

			//   // Add the Stripe Payment Intent reference to the ride and save it
			//   ride.stripePaymentIntentId = paymentIntent.id;
			//   ride.save();

			// const total = order.items.reduce(
			// 	(total, item) => total + item.price * item.quantity,
			// 	0,
			// )

			// try {
			// 	const customer = await stripe.customers.create()

			// 	const paymentIntent = await stripe.paymentIntents.create({
			// 		customer: customer.id,
			// 		setup_future_usage: 'off_session',
			// 		amount: Math.round(total * 100),
			// 		currency: 'usd',
			// 		automatic_payment_methods: {
			// 			enabled: true,
			// 		},
			// 	})
			// 	return res
			// 		.status(statusCodes.ok)
			// 		.json({ clientSecret: paymentIntent.client_secret })
			// } catch (error) {
			// 	return res
			// 		.status(statusCodes.badRequest)
			// 		.json({ error: 'Unable to create the payment intent' })
			// }

			// const session = await getServerSession(req, res, authOptions)
			// const restaurant = await getRestaurant({
			// 	restaurantId: item.restaurantId,
			// })

			// if (
			// 	session.user.id !== restaurant.ownerId &&
			// 	session.user.role !== 'admin'
			// ) {
			// 	return res
			// 		.status(statusCodes.unauthorized)
			// 		.json({ status: 'error', message: 'Not the right owner' })
			// }

			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
