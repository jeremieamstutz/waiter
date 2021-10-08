import Image from 'next/image'

export default function AboutPage() {
	const restaurant = { name: 'Holy Cow' }
	return (
		<>
			<h1>About</h1>
			<Image
				src={`${process.env.NEXT_PUBLIC_DOMAIN}/api/qrcode?url=${process.env.NEXT_PUBLIC_DOMAIN}/lausanne/holycow`}
				alt={`${restaurant.name}'s QR code`}
				width={375}
				height={375}
			/>
		</>
	)
}
