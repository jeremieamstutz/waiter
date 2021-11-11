import Image from 'next/image'

import classes from './desktop-unavailable.module.css'

export default function DesktopUnavailable({ url }) {
	return (
		<div className={classes.container}>
			<Image
				src={`${process.env.NEXT_PUBLIC_DOMAIN}/api/qrcode?url=${process.env.NEXT_PUBLIC_DOMAIN + url}`}
				alt="Page's QR code"
				width={280}
				height={280}
				priority={true}
			/>
			<h1 className={classes.title}>Indisponible</h1>
			<p className={classes.text}>
				La version ordinateur/tablette de cette page n'est{' '}
				<span style={{ color: '#000' }}>pas encore</span> disponible.
			</p>
			<p className={classes.text}>
				Veuillez la consulter depuis un <span style={{ color: '#000' }}>smartphone</span> en scannant le <span style={{ color: '#000' }}>code
				QR</span> ci-dessus.
			</p>
		</div>
	)
}
