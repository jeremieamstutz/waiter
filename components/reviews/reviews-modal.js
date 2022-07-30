import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'

import sleep from 'utils/sleep'

import { useRestaurant } from 'contexts/restaurant'

import Modal from 'components/ui/modal'
import Textarea from 'components/form/textarea'

import classes from './reviews-modal.module.css'

function ReplyForm({ onClose }) {
	const REPLY_MAX_LENGTH = 240
	const REPLY_MIN_LENGTH = 10

	const { t } = useTranslation()

	const listeners = useCallback(
		(event) => {
			switch (event.keyCode) {
				case 27:
					event.stopPropagation()
					onClose()
					break
			}
		},
		[onClose],
	)

	useEffect(() => {
		document.addEventListener('keydown', listeners, true)
		return () => {
			document.removeEventListener('keydown', listeners, true)
		}
	}, [listeners])

	return (
		<Formik
			initialValues={{
				comment: '',
			}}
			validationSchema={object({
				comment: string()
					.trim()
					.min(
						REPLY_MIN_LENGTH,
						t('reviews:modal.comment.validation.min'),
					)
					.max(
						REPLY_MAX_LENGTH,
						t('reviews:modal.comment.validation.max'),
					),
			})}
			onSubmit={async (values, { setSubmitting, setStatus }) => {
				console.log('submitting')
				await sleep(500)
				setSubmitting(false)
				setStatus('success')
			}}
		>
			{({ status, isSubmitting, values, isValid }) => (
				<Form
					style={{
						gap: '0.75rem',
						flexDirection: 'row',
						marginTop: '0.5rem',
					}}
				>
					<Textarea name="comment" rows={2} autoFocus />
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: '0.5rem',
								alignItems: 'center',
								// justifyContent: 'space-between',
							}}
						>
							<button
								className="secondary"
								disabled={!isValid}
								// style={{
								// 	background: !isValid ? 'red' : 'black',
								// }}
							>
								{t('common:misc.actions.send')}
							</button>
							<div
								style={{
									fontFamily: 'Rubik',
									fontSize: '1rem',
									color:
										values.comment.length > REPLY_MAX_LENGTH
											? '#a00'
											: '#666',
								}}
							>
								{values.comment.length}/{REPLY_MAX_LENGTH}
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	)
}
// function ReplyForm({ onClose }) {
// 	const REPLY_MAX_LENGTH = 240
// 	const REPLY_MIN_LENGTH = 10

// 	const { t } = useTranslation()

// 	const listeners = useCallback(
// 		(event) => {
// 			switch (event.keyCode) {
// 				case 27:
// 					event.stopPropagation()
// 					onClose()
// 					break
// 			}
// 		},
// 		[onClose],
// 	)

// 	useEffect(() => {
// 		document.addEventListener('keydown', listeners, true)
// 		return () => {
// 			document.removeEventListener('keydown', listeners, true)
// 		}
// 	}, [listeners])

// 	return (
// 		<Formik
// 			initialValues={{
// 				comment: '',
// 			}}
// 			validationSchema={object({
// 				comment: string()
// 					.min(
// 						REPLY_MIN_LENGTH,
// 						t('reviews:modal.comment.validation.min'),
// 					)
// 					.max(
// 						REPLY_MAX_LENGTH,
// 						t('reviews:modal.comment.validation.max'),
// 					),
// 			})}
// 			onSubmit={async (values, { setSubmitting, setStatus }) => {
// 				console.log('submitting')
// 				await sleep(500)
// 				setSubmitting(false)
// 				setStatus('success')
// 			}}
// 		>
// 			{({ status, isSubmitting, values, isValid }) => (
// 				<Form
// 					style={{
// 						marginTop: '0.5rem',
// 						background: '#eee',
// 						borderRadius: '0.5rem',
// 						gap: 0,
// 					}}
// 				>
// 					<Textarea name="comment" rows={2} autoFocus />
// 					<div
// 						style={{
// 							flex: 1,
// 							display: 'flex',
// 							gap: '0.5rem',
// 							alignItems: 'flex-end',
// 							justifyContent: 'space-between',
// 							padding: '1rem',
// 							paddingTop: 0
// 						}}
// 					>
// 						<div
// 							style={{
// 								fontFamily: 'Rubik',
// 								fontSize: '1rem',
// 								color:
// 									values.comment.length > REPLY_MAX_LENGTH
// 										? '#a00'
// 										: '#666',
// 							}}
// 						>
// 							{values.comment.length}/{REPLY_MAX_LENGTH}
// 						</div>
// 						<button
// 							className="secondary"
// 							disabled={!isValid}
// 							// style={{
// 							// 	background: !isValid ? 'red' : 'black',
// 							// }}
// 						>
// 							{t('common:misc.send')}
// 						</button>
// 					</div>
// 				</Form>
// 			)}
// 		</Formik>
// 	)
// }

function Review({ review }) {
	const { t } = useTranslation()
	const router = useRouter()
	const { data: session, status } = useSession()

	const { restaurant } = useRestaurant()

	const [showReply, setShowReply] = useState(false)

	const [isLoading, setIsLoading] = useState(false)
	const [translation, setTranslation] = useState()
	const [showTranslation, setShowTranslation] = useState(false)

	const [reported, setReported] = useState(false)

	async function translationHandler() {
		if (!translation) {
			setIsLoading(true)
			const { data } = await axios({
				url: 'https://translation.googleapis.com/language/translate/v2',
				method: 'POST',
				params: {
					q: review.comment,
					target: router.locale,
					format: 'text',
					key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
				},
			})
			setTranslation(data.data.translations[0].translatedText)
			setIsLoading(false)
		}
		setShowTranslation((prev) => !prev)
	}

	return (
		<div className={classes.review}>
			<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
				<img
					src={review.user.image}
					width={48}
					height={48}
					style={{ borderRadius: '50%', objectFit: 'cover' }}
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '0.25rem',
						flex: 1,
					}}
				>
					<Link
						href={{
							pathname: '/users/[userSlug]',
							query: {
								userSlug: 'jeremie.amstutz',
							},
						}}
					>
						<a style={{ fontSize: '1.125rem', color: '#222' }}>
							{review.user.name}
						</a>
					</Link>
					<div style={{ fontFamily: 'Rubik', color: '#666' }}>
						{review.created_at.toLocaleDateString()}
					</div>
				</div>
			</div>
			<div style={{ display: 'flex', marginTop: '0.25rem' }}>
				{[...Array(5).keys()].map((index) => (
					<svg
						key={index}
						xmlns="http://www.w3.org/2000/svg"
						width={20}
						height={20}
						viewBox="0 0 20 20"
						fill={index + 1 <= review.rating ? 'black' : '#ccc'}
					>
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
				))}
			</div>
			<p style={{ margin: 0, color: '#333' }}>
				{showTranslation ? translation : review.comment}
			</p>
			<div className={classes.actions}>
				{status === 'authenticated' &&
					(session.user.id === restaurant.ownerId ||
						session.user.role === 'admin') && (
						<button
							onClick={() => setShowReply((prev) => !prev)}
							style={{ color: showReply ? '#000' : '#666' }}
							className="text"
						>
							{t('common:misc.actions.reply')}
						</button>
					)}
				<button onClick={translationHandler} className="text">
					{isLoading
						? t('common:misc.actions.loading')
						: showTranslation
						? t('common:misc.actions.showOriginal')
						: t('common:misc.actions.translate')}
				</button>
				<button className="text" onClick={() => setReported(true)}>
					{reported
						? t('common:misc.states.reported')
						: t('common:misc.actions.report')}
				</button>
			</div>
			{showReply && <ReplyForm onClose={() => setShowReply(false)} />}
		</div>
	)
}

export default function ReviewsModal({ onClose }) {
	const { t } = useTranslation()
	const router = useRouter()

	const id = 'booking'

	const reviews = [
		{
			user: {
				name: 'Jérémie',
				image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
			},
			created_at: new Date('1998-01-27'),
			rating: 5,
			comment: "Fantastic restaurant ! I'll come back for sure",
		},
		{
			user: {
				name: 'Huguette',
				image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
			},
			created_at: new Date('2001-09-06'),
			rating: 2,
			comment:
				'Fusce ex ipsum, euismod eu est non, euismod elementum elit. Sed maximus molestie dolor, eget mollis nibh fermentum ut',
		},
		{
			user: {
				name: 'Frédéric',
				image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1023&q=80',
			},
			created_at: new Date('2000-04-07'),
			rating: 3,
			comment:
				'Quisque in mi eget lectus commodo consequat id in nunc. Proin metus neque, volutpat sit amet nibh eget, sodales efficitur nisi.',
		},
		{
			user: {
				name: 'Oscar',
				image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
			},
			created_at: new Date('1999-12-23'),
			rating: 8,
			comment:
				'Sed et laoreet ipsum, sed imperdiet dolor. Mauris orci neque, eleifend ac orci quis, condimentum vehicula erat. Fusce tempor vitae nisi id venenatis.',
		},
		{
			user: {
				name: 'Gertrude',
				image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
			},
			created_at: new Date('2003-04-10'),
			rating: 5,
			comment:
				'Fusce ex ipsum, euismod eu est non, euismod elementum elit. Sed maximus molestie dolor, eget mollis nibh fermentum ut',
		},
		{
			user: {
				name: 'Fred',
				image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1023&q=80',
			},
			created_at: new Date('1971-11-13'),
			rating: 5,
			comment:
				'Quisque in mi eget lectus commodo consequat id in nunc. Proin metus neque, volutpat sit amet nibh eget, sodales efficitur nisi.',
		},
	]

	return (
		<Modal
			title={t('reviews:modal.reviews')}
			onClose={onClose}
			style={{ maxWidth: '50rem' }}
		>
			<section
				style={{
					marginBottom: '2rem',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '2rem',
					// borderBottom: '1px solid #eee',
					// paddingBottom: '2rem',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div
						style={{
							fontSize: '4rem',
						}}
					>
						4.9
					</div>
					<div style={{ fontSize: '1.125rem' }}>
						91 {t('reviews:modal.reviews').toLocaleLowerCase()}
					</div>
				</div>
				{/* <div
					style={{
						display: 'flex',
						flexDirection: 'column',
                        gap: '0.5rem',
						justifyContent: 'space-between',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						<div>Food</div>
						<div>4.4</div>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						<div>Service</div>
						<div>4.7</div>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						<div>Ambiance</div>
						<div>4.9</div>
					</div>
				</div> */}
			</section>
			<section className={classes.reviews}>
				{reviews.map((review, index) => (
					<Review review={review} key={index} />
				))}
			</section>
		</Modal>
	)
}
