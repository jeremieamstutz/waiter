import sharp from 'sharp'
import statusCodes from 'utils/statusCodes'

export default async function handler(req, res) {
	const {
		query: { url, filename, width, height, fit, position, format, quality },
		method,
	} = req

	switch (method) {
		case 'GET':
			if (!url) {
				res.status(statusCodes.badRequest).end()
				break
			}

			const originalImage = await (await fetch(url)).buffer()
			const newImage = await sharp(originalImage)
				.resize({
					width: +width || 500,
					height: +height || 400,
					fit: fit || 'cover',
					position: position || 'entropy',
				})
				.toFormat(format || 'jpg', { quality: +quality || 80 })
				.toBuffer()
			res.setHeader('Content-Type', 'image/' + (format || 'jpg'))
			res.setHeader(
				'Content-Disposition',
				`inline; filename="${filename || 'image'}.${format || 'jpg'}`,
			)
			res.setHeader('Cache-Control', 'public, max-age=31536000')
			res.status(statusCodes.ok).send(newImage)
			break
		default:
			res.status(statusCodes.methodNotAllowed).end()
			break
	}
}
