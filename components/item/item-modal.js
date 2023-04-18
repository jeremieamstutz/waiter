import { useCallback, useEffect, useId, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { Form, Formik } from 'formik'

import track from 'utils/track'

import { useOrder } from 'contexts/order'
import { useRestaurant } from 'contexts/restaurant'
import { useFlags } from 'contexts/flags'

import Modal from 'components/ui/modal'
import RadioGroup from 'components/form/radio'
import CheckboxGroup from 'components/form/checkbox'
import Textarea from 'components/form/textarea'
import Switch from 'components/form/switch'

import classes from './item-modal.module.css'
import ChevronIcon from 'components/icons/chevron'
import VegetarianIcon from 'components/icons/vegetarian'
import axios from 'axios'
import { mutate } from 'swr'
import useEventListener from 'hooks/useEventListener'

export default function ItemModal({ item, onClose }) {
	const router = useRouter()
	const { data: session } = useSession()
	const { t } = useTranslation()
	const { restaurant } = useRestaurant()
	const { flags } = useFlags()
	const { addItem } = useOrder()

	const availableItems = restaurant.items.filter(
		(itm) => itm.categoryId === item.categoryId,
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

	const handlePrevItem = useCallback(() => {
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
	}, [prevItemId, router])

	const handleNextItem = useCallback(() => {
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
	}, [nextItemId, router])

	// const listeners = useCallback(
	// 	(event) => {
	// 		event.stopImmediatePropagation()
	// 		console.log(event)
	// 		switch (event.keyCode) {
	// 			// Previous item
	// 			case 37:
	// 				event.preventDefault()
	// 				console.log('prev')
	// 				handlePrevItem()
	// 				break
	// 			// Next item
	// 			case 39:
	// 				event.preventDefault()
	// 				console.log('next')
	// 				handleNextItem()
	// 				break
	// 		}
	// 	},
	// 	[handlePrevItem, handleNextItem],
	// )

	// useEffect(() => {
	// 	console.log('setup listeners')
	// 	document.addEventListener('keydown', listeners)
	// 	return () => {
	// 		console.log('remove listeners')
	// 		document.removeEventListener('keydown', listeners)
	// 	}
	// }, [listeners])

	useEventListener('keydown', (event) => {
		switch (event.keyCode) {
			// Previous item
			case 37: {
				event.preventDefault()
				handlePrevItem()
				break
			}
			// Next item
			case 39: {
				event.preventDefault()
				handleNextItem()
				break
			}
		}
	})

	const [quantity, setQuantity] = useState(1)
	const id = useId()

	if (!item) {
		return (
			<Modal title="Not found" onClose={onClose}>
				<p style={{ textAlign: 'center' }}>
					Sorry, we couldn&apos;t find any detail for this item
				</p>
			</Modal>
		)
	}

	return (
		<>
			<Formik
				initialValues={{ vins: [], accompagnement: '', note: '' }}
				onSubmit={(values) => {
					console.log('ORDERING', values)
					addItem({
						...item,
						quantity,
					})
					track.event({
						event_category: 'order',
						event_name: 'add_to_order',
						event_label: item.name,
						value: item.price,
					})
					onClose()
				}}
			>
				{({ status, isSubmitting, values }) => (
					<Modal
						title={item.name}
						onClose={onClose}
						footer={
							session?.user.id === restaurant.ownerId ||
							session?.user.role === 'admin' ? (
								<>
									<Formik
										initialValues={{
											available: item.available,
										}}
										onSubmit={async ({ available }) => {
											await axios({
												method: 'PUT',
												url: `/api/items/${item.id}`,
												data: {
													available,
												},
											})
											await mutate(
												`/api/restaurants/${restaurant.id}`,
											)
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
							) : flags.orders ? (
								<>
									{/* <div
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
												width: '1rem',
												textAlign: 'center',
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
									</div> */}
									<button
										style={{
											flexShrink: 0,
											minWidth: 0,
											width: '2.5rem',
											height: '2.5rem',
											padding: 0,
											borderRadius: '50%',
										}}
										onClick={handlePrevItem}
									>
										<ChevronIcon direction="left" />
									</button>
									<button
										className="secondary"
										disabled={!item.available}
										type="submit"
										form={id}
										style={{
											flex: 1,
											display: 'flex',
										}}
									>
										{t('item:actions.addToCart')}
									</button>
									<button
										style={{
											flexShrink: 0,
											minWidth: 0,
											width: '2.5rem',
											height: '2.5rem',
											padding: 0,
											borderRadius: '50%',
										}}
										onClick={handleNextItem}
									>
										<ChevronIcon direction="right" />
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
								{item.image && (
									<Image
										alt={item.name}
										src={item.image}
										width={640}
										height={640}
										priority={true}
										sizes="640px"
										style={{
											display: 'block',
											width: '100%',
											height: 'auto',
											aspectRatio: 1,
											objectFit: 'cover',
										}}
									/>
								)}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: '0.5rem',
										justifyContent: 'space-between',
									}}
								>
									{!item.available && (
										<div
											style={{
												color: 'white',
												width: 'fit-content',
												background: '#a00',
												padding: '0.25rem 0.5rem',
												borderRadius: '0.25rem',
												margin: '0.125rem 0 0.25rem',
											}}
										>
											{t('item:status.unavailable')}
										</div>
									)}
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
									{item.description && (
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
									)}
									<div
										style={{
											fontFamily: 'Rubik',
											fontSize: '1.125rem',
											color: 'var(--color-ui-primary)',
											// textAlign: 'right',
										}}
									>
										{(+item.price).toFixed(2)}
									</div>
								</div>
								{item.tags?.length > 0 && (
									<Tags tags={item.tags} />
								)}
								{item.allergies?.length > 0 && (
									<Allergies allergies={item.allergies} />
								)}
								{flags.modifiers && (
									<>
										<RadioGroup
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
										</RadioGroup>
										{/* <CheckboxGroup
											label="Verre de vin conseillé"
											name="vins"
										>
											<CheckboxGroup.Item value="chardonnay">
												<div>Chardonnay</div>
												<div
													style={{
														color: '#a00',
													}}
												>
													5.00
												</div>
											</CheckboxGroup.Item>
											<CheckboxGroup.Item value="oeil de Perdrix">
												<div>Oeil de Perdrix</div>
												<div
													style={{
														color: '#a00',
													}}
												>
													4.00
												</div>
											</CheckboxGroup.Item>
											<CheckboxGroup.Item value="st. Saphorin">
												<div>St. Saphorin</div>
												<div
													style={{
														color: '#a00',
													}}
												>
													6.00
												</div>
											</CheckboxGroup.Item>
										</CheckboxGroup> */}
										{/* <RadioGroup
											label="Portion"
											name="portion"
										>
											<RadioGroup.Item value="petite">
												<span>Petite portion</span>
											</RadioGroup.Item>
											<RadioGroup.Item value="grande">
												<span>Grande portion</span>
												<span>5.00</span>
											</RadioGroup.Item>
										</RadioGroup> */}
										<Textarea
											label="Note"
											name="note"
											rows={3}
										/>
									</>
								)}
							</div>
						</Form>
					</Modal>
				)}
			</Formik>
		</>
	)
}

function Tags({ tags }) {
	const { t } = useTranslation()

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
		>
			<label>Tags</label>
			<div
				style={{
					display: 'flex',
					gap: '0.5rem',
					flexWrap: 'wrap',
				}}
			>
				{tags.map((tag, index) => {
					switch (tag) {
						case 'vegetarian': {
							return (
								<div
									key={index}
									style={{
										display: 'flex',
										gap: '0.5rem',
										alignItems: 'center',
										justifyContent: 'center',
										background: '#017F00',
										borderRadius: '1rem',
										color: 'white',
										height: '2rem',
										padding: '0.75rem',
									}}
								>
									<VegetarianIcon width={12} fill="white" />
									Végétarien
								</div>
							)
						}
						default: {
							return (
								<div
									key={index}
									style={{
										display: 'flex',
										gap: '0.5rem',
										alignItems: 'center',
										justifyContent: 'center',
										background: '#eee',
										borderRadius: '1rem',
										color: '#222',
										height: '2rem',
										padding: '0.75rem',
									}}
								>
									{t('item:tags.' + tag)}
								</div>
							)
						}
					}
				})}
			</div>
		</div>
	)
}

function Allergies({ allergies }) {
	const { t } = useTranslation()

	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
		>
			<label>Allergies</label>
			<div
				style={{
					display: 'flex',
					gap: '0.5rem',
					flexWrap: 'wrap',
				}}
			>
				{allergies.map((allergy) => (
					<div
						key={allergy}
						style={{
							background: '#eee',
							borderRadius: '1.5rem',
							padding: '0.5rem 1rem',
						}}
					>
						{t('item:allergies.' + allergy)}
					</div>
				))}
			</div>
		</div>
	)
}
