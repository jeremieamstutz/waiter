import Document, { Html, Head, Main, NextScript } from 'next/document'

const isProduction = process.env.NODE_ENV === 'production'

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta name="theme-color" content="#ffffff" />
					<link rel="icon" href="/favicon.ico" />
					<link
						rel="preload"
						href="/fonts/Gilroy/Gilroy-SemiBold.otf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/DM_Sans/DMSans-Medium.ttf"
						as="font"
						crossOrigin=""
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
