import { v4 as uuid } from 'uuid'
import AWS from 'aws-sdk'

import statusCode from '../../utils/statusCodes'

const s3 = new AWS.S3({
	endpoint: new AWS.Endpoint(process.env.SPACE_ENDPOINT),
	accessKeyId: process.env.SPACE_ID,
	secretAccessKey: process.env.SPACE_SECRET,
	signatureVersion: 'v4',
})

export default async function handler(req, res) {
	const { method } = req

	const { filename, type } = req.body

	switch (method) {
		case 'POST':
			if (!filename || !type) {
				return res
					.status(statusCode.badRequest)
					.json({ success: false, message: 'Incorrect config' })
			}

			const params = {
				Bucket: process.env.SPACE_BUCKET,
				Expires: 3600,
				CacheControl: 'max-age=31536000', // 1 year
				Key: uuid(),
				ContentType: type,
				ACL: 'public-read',
			}

			const url = await s3.getSignedUrl('putObject', params)

			res.status(statusCode.ok).json({ success: true, url: url })
			break
		default:
			res.status(statusCode.methodNotAllowed).end()
	}
}
