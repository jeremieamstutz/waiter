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
                color: { dark: '#000000' },
                type: 'svg'
            })
			res.setHeader('Content-Type', 'image/svg+xml')
			res.status(statusCodes.ok).send(code)
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
