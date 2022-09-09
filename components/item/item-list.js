import { forwardRef, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import axios from 'axios'

import ItemCard, { NewItemCard } from './item-card'

import classes from './item-list.module.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default forwardRef(function ItemList(
	{ restaurant, category, items },
	ref,
) {
	const router = useRouter()
	const { data: session, status } = useSession()
	const { t } = useTranslation()

	const [showSheet, setShowSheet] = useState(false)

	const handleDeleteCategory = async () => {
		await axios.delete(`/api/categories/${category.id}`)
		router.reload()
	}

	const listRef = useRef()

	const [prevEl, setPrevEl] = useState(null)
	const [nextEl, setNextEl] = useState(null)
	const [pagEl, setPagEl] = useState(null)

	return (
		<section className={classes.container}>
			<div className={classes.header}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '1rem',
					}}
				>
					<div className={classes.body}>
						<h2 className={classes.name}>{category.name}</h2>
						<p className={classes.description}>
							{category.description}
						</p>
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					{restaurant &&
						status === 'authenticated' &&
						(session.user.id === restaurant.ownerId ||
							session.user.role === 'admin') && (
							<div style={{ display: 'flex', gap: '0.5rem' }}>
								<button
									onClick={() =>
										router.push(
											{
												pathname: router.pathname,
												query: {
													restaurantSlug:
														router.query
															.restaurantSlug,
													editCategory: category.id,
												},
											},
											undefined,
											{ shallow: true },
										)
									}
								>
									{t('common:misc.actions.edit')}
								</button>
							</div>
						)}
					<div className={classes.navigation}>
						<button
							ref={(node) => setPrevEl(node)}
							style={{
								minWidth: 0,
								padding: 0,
								width: '2.5rem',
								height: '2.5rem',
								borderRadius: '50%',
								marginLeft: '1rem',
							}}
							aria-label="Previous item"
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
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<div
							ref={(node) => setPagEl(node)}
							style={{ width: 'auto' }}
						></div>
						<button
							ref={(node) => setNextEl(node)}
							style={{
								minWidth: 0,
								padding: 0,
								width: '2.5rem',
								height: '2.5rem',
								borderRadius: '50%',
							}}
							aria-label="Next item"
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
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<Swiper
				ref={listRef}
				modules={[Navigation, Pagination]}
				loop={false}
				navigation={{
					prevEl,
					nextEl,
				}}
				slidesPerView="auto"
				slidesPerGroupAuto={true}
				spaceBetween={14}
				threshold={4}
				pagination={{
					el: pagEl,
					type: 'fraction',
				}}
				centeredSlidesBounds={true}
				breakpoints={{
					0: {
						centeredSlides: true,
					},
					480: {
						centeredSlides: false,
					},
				}}
				className={classes.swiper}
			>
				{items.map((item, index) => (
					<SwiperSlide key={index} style={{ width: 'auto' }}>
						<ItemCard
							item={item}
							category={category}
							key={index}
							index={index}
							lazyRoot={listRef}
						/>
					</SwiperSlide>
				))}
				{restaurant &&
					status === 'authenticated' &&
					(session.user.id === restaurant.ownerId ||
						session.user.role === 'admin') && (
						<SwiperSlide style={{ width: 'auto' }}>
							<NewItemCard category={category} />
						</SwiperSlide>
					)}
			</Swiper>
		</section>
	)
})
