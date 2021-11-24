import QRCode from 'qrcode'

import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const {
		query: { url },
		method,
	} = req

	switch (method) {
		case 'GET':
			const code = await QRCode.toString(url, {
				errorCorrectionLevel: 'M',
				margin: 1,
				color: { dark: '#000000' },
				type: 'svg',
			})
			res.setHeader('Content-Type', 'image/svg+xml')
			res.setHeader('Cache-Control', 'public, max-age=31536000')
			res.status(statusCodes.ok).send(code)
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}

// <Image
// 	src={`${process.env.NEXT_PUBLIC_DOMAIN}/api/qrcode?url=${process.env.NEXT_PUBLIC_DOMAIN}/${restaurant.restaurantSlug}`}
// 	alt={`${restaurant.name}'s QR code`}
// 	width={375}
// 	height={375}
// 	priority={true}
// />
