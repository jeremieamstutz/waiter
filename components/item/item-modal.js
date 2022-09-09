import { useEffect, useId, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { Form, Formik } from 'formik'

import { useOrder } from 'contexts/order'
import { useRestaurant } from 'contexts/restaurant'
import { useFlags } from 'contexts/flags'

import Modal from 'components/ui/modal'
import RadioGroup from 'components/form/radio'
import CheckboxGroup from 'components/form/checkbox'
import Textarea from 'components/form/textarea'
import Switch from 'components/form/switch'

import classes from './item-modal.module.css'

export default function ItemModal({ item, onClose }) {
	const router = useRouter()
	const { data: session } = useSession()
	const { t } = useTranslation()
	const { restaurant } = useRestaurant()
	const { flags } = useFlags()
	const orderContext = useOrder()

	item.allergies = ['Poissson', 'Lait']
	item.tags = ['Bio', 'Sain']

	const availableItems = restaurant.items.filter(
		(itm) => itm.category_id === item.category_id && itm.available,
	)
	const itemIndex = availableItems.map((itm) => itm.id).indexOf(item.id)

	const prevItemId =
		availableItems.length > 1
			? availableItems[
					(itemIndex - 1 + availableItems.length) %
						availableItems.length
			  ].id
			: undefined
	const nextItemId =
		availableItems.length > 1
			? availableItems[(itemIndex + 1) % availableItems.length].id
			: undefined

	const handlePrevItem = () => {
		router.replace(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					item: prevItemId,
				},
			},
			undefined,
			{ shallow: true },
		)
	}

	const handleNextItem = () => {
		router.replace(
			{
				pathname: router.pathname,
				query: {
					...router.query,
					item: nextItemId,
				},
			},
			undefined,
			{ shallow: true },
		)
	}

	function listeners(event) {
		switch (event.keyCode) {
			// Previous item
			case 37:
				event.preventDefault()
				handlePrevItem()
				break
			// Next item
			case 39:
				event.preventDefault()
				handleNextItem()
				break
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', listeners)
		return () => {
			document.removeEventListener('keydown', listeners)
		}
	}, [listeners])

	const [quantity, setQuantity] = useState(1)
	const id = useId()

	return (
		<>
			<Formik
				initialValues={{ vins: [], accompagnement: '' }}
				// initialValues={{
				// 	date: new Date().toISOString().split('T')[0],
				// 	hour: '20:00',
				// 	guests: 2,
				// 	remark: '',
				// }}
				// validationSchema={object({
				// 	date: date().required('Date is required'),
				// 	hour: string().required('Hour is required'),
				// 	guests: number()
				// 		.required()
				// 		.positive()
				// 		.integer('Number of guests is required'),
				// 	remark: string().max(240, 'Remark is too long'),
				// })}
				// onSubmit={async (values, { setSubmitting, setStatus }) => {
				// 	console.log('submitting')
				// 	await sleep(500)
				// 	setSubmitting(false)
				// 	setStatus('success')
				// }}
				onSubmit={() => {
					console.log('ORDERING')
				}}
			>
				{({ status, isSubmitting, values }) => (
					<Modal
						title={item.name}
						onClose={onClose}
						// header={
						// 	<div
						// 		style={{
						// 			width: '100%',
						// 			display: 'flex',
						// 			alignItems: 'center',
						// 			justifyContent: 'space-between',
						// 			gap: '1rem',
						// 		}}
						// 	>
						// 		<button
						// 			style={{
						// 				flexShrink: 0,
						// 				minWidth: 0,
						// 				width: '2.5rem',
						// 				height: '2.5rem',
						// 				padding: 0,
						// 				borderRadius: '50%',
						// 			}}
						// 			onClick={handlePrevItem}
						// 		>
						// 			<svg
						// 				xmlns="http://www.w3.org/2000/svg"
						// 				width={18}
						// 				height={18}
						// 				viewBox="0 0 20 20"
						// 				fill="currentColor"
						// 			>
						// 				<path
						// 					fillRule="evenodd"
						// 					d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
						// 					clipRule="evenodd"
						// 				/>
						// 			</svg>
						// 		</button>
						// 		<h1>{item.name}</h1>
						// 		<div style={{ display: 'flex', gap: '0.5rem' }}>
						// 			<button
						// 				style={{
						// 					minWidth: 0,
						// 					flexShrink: 0,
						// 					width: '2.5rem',
						// 					height: '2.5rem',
						// 					padding: 0,
						// 					borderRadius: '50%',
						// 				}}
						// 				onClick={handleNextItem}
						// 			>
						// 				<svg
						// 					xmlns="http://www.w3.org/2000/svg"
						// 					width={18}
						// 					height={18}
						// 					viewBox="0 0 20 20"
						// 					fill="currentColor"
						// 				>
						// 					<path
						// 						fillRule="evenodd"
						// 						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						// 						clipRule="evenodd"
						// 					/>
						// 				</svg>
						// 			</button>
						// 			<button
						// 				onClick={onClose}
						// 				style={{
						// 					minWidth: 0,
						// 					flexShrink: 0,
						// 					width: '2.5rem',
						// 					height: '2.5rem',
						// 					padding: 0,
						// 					borderRadius: '50%',
						// 				}}
						// 			>
						// 				<svg
						// 					xmlns="http://www.w3.org/2000/svg"
						// 					width={16}
						// 					height={16}
						// 					viewBox="0 0 20 20"
						// 					fill="currentColor"
						// 				>
						// 					<path
						// 						fillRule="evenodd"
						// 						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						// 						clipRule="evenodd"
						// 					/>
						// 				</svg>
						// 			</button>
						// 		</div>
						// 	</div>
						// }
						footer={
							session?.user.id === restaurant.ownerId ||
							session?.user.role === 'admin' ? (
								<>
									<Formik
										initialValues={{ available: true }}
										onSubmit={(values) => {
											console.log('Changing to: ', values)
										}}
									>
										{({
											values,
											handleChange,
											submitForm,
										}) => (
											<Form>
												<Switch
													name="available"
													label={
														values.available
															? t(
																	'item:status.available',
															  )
															: t(
																	'item:status.unavailable',
															  )
													}
													onChange={(event) => {
														handleChange(event)
														submitForm()
													}}
													style={{
														flex: 0,
													}}
												/>
											</Form>
										)}
									</Formik>
									<button
										className="secondary"
										// style={{ flex: 1 }}
										onClick={() => {
											router.push(
												{
													pathname: router.pathname,
													query: {
														restaurantSlug:
															router.query
																.restaurantSlug,
														editItem: item.id,
													},
												},
												undefined,
												{ shallow: true },
											)
										}}
									>
										{t('common:misc.actions.edit')}
									</button>
								</>
							) : flags.ordering ? (
								<>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '1rem',
										}}
									>
										<button
											onClick={() => {
												if (quantity > 1) {
													setQuantity(quantity - 1)
												}
											}}
											style={{
												minWidth: 0,
												width: '2.5rem',
												height: '2.5rem',
												borderRadius: '50%',
												padding: 0,
											}}
											disabled={quantity <= 1}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
										<div
											style={{
												fontSize: '1.125rem',
											}}
										>
											{quantity}
										</div>
										<button
											onClick={() =>
												setQuantity(quantity + 1)
											}
											style={{
												minWidth: 0,
												width: '2.5rem',
												height: '2.5rem',
												borderRadius: '50%',
												padding: 0,
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</div>
									<button
										className="secondary"
										disabled={!item.available}
										onClick={() => {
											orderContext.addItem({
												...item,
												quantity,
											})
											onClose()
										}}
										style={{
											flex: 1,
											display: 'flex',
											justifyContent: 'space-between',
										}}
									>
										<span
											style={{
												fontSize: '1.125rem',
											}}
										>
											Ajouter
										</span>
										<span
											style={{
												fontSize: '1.125rem',
											}}
										>
											CHF{' '}
											{(quantity * item.price).toFixed(2)}
										</span>
									</button>
								</>
							) : null
						}
					>
						<Form className={classes.form} id={id}>
							<div
								style={{
									display: 'flex',
									gap: '1rem',
									flexDirection: 'column',
								}}
							>
								<div
									className={classes.image}
									style={{
										position: 'relative',
									}}
								>
									<Image
										src={
											item.image
												? item.image
												: '/images/defaults/item.png'
										}
										layout="responsive"
										objectFit="cover"
										objectPosition="center"
										width={290}
										height={250}
										priority={true}
									/>
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '0.25rem',
										justifyContent: 'space-between',
									}}
								>
									{/* <div
										style={{
											color: 'white',
											width: 'fit-content',
											background: '#e67e22',
											padding: '0.25rem 0.5rem',
											borderRadius: '0.25rem',
											margin: '0.125rem 0 0.25rem',
										}}
									>
										Nouveau
									</div> */}
									<p
										style={{
											fontSize: '1.125rem',
											margin: 0,
											lineHeight: '150%',
											color: '#333',
										}}
									>
										{item.description}
									</p>
									<div
										style={{
											fontFamily: 'Rubik',
											fontSize: '1.125rem',
											color: 'var(--color-ui-primary)',
										}}
									>
										CHF {(+item.price).toFixed(2)}
									</div>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										gap: '1rem',
									}}
								>
									<div
										style={{
											display: 'flex',
											gap: '0.5rem',
											flexWrap: 'wrap',
										}}
									>
										{item.tags.map((tag, index) => (
											<div
												key={index}
												style={{
													background: '#eee',
													borderRadius: '1rem',
													padding: '0.5rem 1rem',
												}}
											>
												{tag}
											</div>
										))}
									</div>
									<div
										style={{
											display: 'flex',
											gap: '0.5rem',
											flexWrap: 'wrap',
										}}
									>
										{item.allergies.map(
											(allergy, index) => (
												<div
													key={index}
													style={{
														background: '#eee',
														borderRadius: '1.5rem',
														padding: '0.5rem 1rem',
													}}
												>
													{allergy}
												</div>
											),
										)}
									</div>
								</div>

								{/* <RadioGroup
									label="Accompagnement"
									name="accompagnement"
								>
									<RadioGroup.Item value="frites">
										Frites allumettes
									</RadioGroup.Item>
									<RadioGroup.Item value="pommes">
										Pommes vapeurs
									</RadioGroup.Item>
									<RadioGroup.Item value="riz">
										Riz basmati du japon
									</RadioGroup.Item>
								</RadioGroup> */}
								<CheckboxGroup
									label="Verre de vin conseillé"
									name="vins"
								>
									<CheckboxGroup.Item value="chardonnay">
										<span>Chardonnay</span>
										<span>+ CHF 5.00</span>
									</CheckboxGroup.Item>
									<CheckboxGroup.Item value="oeil de Perdrix">
										<span>Oeil de Perdrix</span>
										<span>+ CHF 4.00</span>
									</CheckboxGroup.Item>
									<CheckboxGroup.Item value="st. Saphorin">
										<span>St. Saphorin</span>
										<span>+ CHF 6.00</span>
									</CheckboxGroup.Item>
								</CheckboxGroup>
								<RadioGroup label="Portion" name="portion">
									<RadioGroup.Item value="petite">
										<span>Petite portion</span>
									</RadioGroup.Item>
									<RadioGroup.Item value="grande">
										<span>Grande portion</span>
										<span>+ CHF 5.00</span>
									</RadioGroup.Item>
								</RadioGroup>
								<Textarea
									label="Remarque"
									name="remark"
									rows={2}
								/>
							</div>
						</Form>
					</Modal>
				)}
			</Formik>
		</>
	)
}
