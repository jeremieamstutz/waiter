import Head from 'next/head'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Feedback } from 'db/models'
import { authOptions } from './api/auth/[...nextauth]'

import Container from 'components/layout/container'
import Header from 'components/layout/header'
import Main from 'components/layout/main'
import Footer from 'components/layout/footer'

const EMOTIONS = {
	up: '👍',
	down: '👎',
}

function FeedbackItem({ feedback }) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '1.5rem',
				}}
			>
				<div style={{ position: 'relative' }}>
					<div
						style={{
							width: '3.5rem',
							height: '3.5rem',
							borderRadius: '50%',
							overflow: 'hidden',
						}}
					>
						<Image
							alt={feedback.user.image.alt}
							src={feedback.user.image.url}
							width={64}
							height={64}
						/>
					</div>
					<span
						style={{
							fontSize: '1.75rem',
							position: 'absolute',
							bottom: 0,
							right: 0,
							lineHeight: '2.5rem',
							translate: '0.5rem 0.5rem',
						}}
					>
						{EMOTIONS[feedback.emotion]}
					</span>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.25rem',
					}}
				>
					<div
						style={{
							fontSize: '1.125rem',
							marginTop: '0.25rem',
						}}
					>
						{feedback.user.firstName} {feedback.user.lastName}
					</div>
					<div
						style={{
							fontFamily: 'Rubik',
							color: '#666',
						}}
					>
						{new Date(feedback.createdAt).toLocaleDateString()}
					</div>
					<div>
						<span>{feedback.url}</span>-
					</div>
				</div>
			</div>
			<p style={{ margin: 0, color: '#333' }}>{feedback.message}</p>
		</div>
	)
}

export default function FeedbacksPage({ feedbacks }) {
	return (
		<>
			<Head>
				<title>Feedbacks - Waiter</title>
			</Head>
			<Container>
				<Header />
				<Main>
					<h1>Feedbacks</h1>
					<section>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns:
									'repeat(auto-fill, minmax(min(25rem, 100vw - 2rem), 1fr))',
								gap: '2rem',
								marginTop: '1rem',
							}}
						>
							{feedbacks.map((feedback) => (
								<FeedbackItem
									feedback={feedback}
									key={feedback.id}
								/>
							))}
						</div>
					</section>
				</Main>
				<Footer />
			</Container>
		</>
	)
}

export async function getServerSideProps({ req, res, locale }) {
	const feedbacks = await Feedback.findAll({
		include: ['user'],
	})

	const session = await getServerSession(req, res, authOptions)

	if (session?.user?.role === 'admin') {
		return {
			props: {
				feedbacks: JSON.parse(JSON.stringify(feedbacks)),
				...(await serverSideTranslations(locale, ['common'])),
			},
		}
	} else {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
}
