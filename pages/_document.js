import Document, { Html, Head, Main, NextScript } from 'next/document'

const isProduction = process.env.NODE_ENV === 'production'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="theme-color" content="#ffffff" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<link
						href="/splashscreens/iphone5_splash.png"
						media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/iphone6_splash.png"
						media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/iphoneplus_splash.png"
						media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/iphonex_splash.png"
						media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/iphonexr_splash.png"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/iphonexsmax_splash.png"
						media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/ipad_splash.png"
						media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/ipadpro1_splash.png"
						media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/ipadpro3_splash.png"
						media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
						rel="apple-touch-startup-image"
					/>
					<link
						href="/splashscreens/ipadpro2_splash.png"
						media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
						rel="apple-touch-startup-image"
					/>
					<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
					<link
						rel="preload"
						href="/fonts/Gilroy/Gilroy-SemiBold.otf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Rubik:wght@400&display=swap"
						rel="stylesheet"
					/>
					<link rel="manifest" href="/manifest.json" />
					{isProduction && (
						<>
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
							/>
							<script
								dangerouslySetInnerHTML={{
									__html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', { send_page_view: false });`,
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
					<div id="sheets"></div>
					<div id="modals"></div>
					<div id="back"></div>
				</body>
			</Html>
		)
	}
}

export default MyDocument
