import { v4 as uuid } from 'uuid'
import AWS from 'aws-sdk'

import statusCode from '../../utils/statusCodes'
import { createUploadedImage } from 'utils/db'

const s3 = new AWS.S3({
	endpoint: new AWS.Endpoint(process.env.SPACES_ENDPOINT),
	accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
	secretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY,
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
				Bucket: process.env.SPACES_BUCKET,
				Expires: 30,
				Key: uuid(),
				ContentType: type,
				ACL: 'public-read',
			}

			const url = await s3.getSignedUrl('putObject', params)

			await createUploadedImage({ url })

			res.status(statusCode.ok).json({ success: true, url: url })
			break
		default:
			res.status(statusCode.methodNotAllowed).end()
	}
}
