import Head from 'next/head'
import Container from './container'
import Footer from './footer'
import Header from './header'
import Main from './main'

export default function Layout({ head, children }) {
	return (
		<>
			<Head>
				<title>
					{head?.title ? `${head.title} • Waiter` : 'Waiter'}
				</title>
				{head?.meta?.description && (
					<meta name="description" content={head.meta.description} />
				)}
				{head?.title && (
					<meta
						property="og:title"
						content={`${head.title} • Waiter`}
					/>
				)}
				{head?.meta?.description && (
					<meta
						property="og:description"
						content={head.meta.description}
					/>
				)}
				{head?.meta?.image && (
					<meta property="og:image" content={head.meta.image} />
				)}
				{head?.meta?.type && (
					<meta property="og:type" content={head.meta.type} />
				)}
				{head?.meta?.data && (
					<script type="application/ld+json">{head.meta.data}</script>
				)}
			</Head>
			<Container>
				<Header />
				<Main>{children}</Main>
				<Footer />
			</Container>
		</>
	)
}
