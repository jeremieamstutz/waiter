import ItemDetail from 'components/item/item-detail'
import Container from 'components/layout/container'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { getFullItem } from './api/[restaurantSlug]/[categorySlug]/[itemSlug]'

export default function Infinite({ item }) {
	const router = useRouter()
	console.log(router.query)
	const listRef = useRef()

	const [items, setItems] = useState([item])

	const [scrollPosition, setScrollPosition] = useState()
	const [scrollHeight, setScrollHeight] = useState()
	const [scrollDirection, setScrollDirection] = useState('up')

	useEffect(() => {
		function handleScroll() {
			if (
				listRef.current.scrollTop +
					listRef.current.clientHeight +
					100 >=
				listRef.current.scrollHeight
			) {
				setItems((items) => [...items, item])
			}

			if (listRef.current.scrollTop < 100) {
				setItems((items) => [item, ...items])
			}

			if (listRef.current.scrollTop >= scrollPosition) {
				setScrollDirection('down')
			} else {
				setScrollDirection('up')
			}
			setScrollPosition(listRef.current.scrollTop)
			setScrollHeight(listRef.current.scrollHeight)
		}

		listRef.current.addEventListener('scroll', handleScroll)
		return () => listRef.current.removeEventListener('scroll', handleScroll)
	}, [scrollPosition])

	useEffect(() => {
		if (scrollDirection === 'up') {
			listRef.current.scrollTop =
				scrollPosition + listRef.current.scrollHeight - scrollHeight
		}
	}, [items])

	return (
		<div ref={listRef} style={{ overflow: 'scroll', padding: '1rem' }}>
			{items.map((item, index) => (
				<ItemDetail item={item} key={index} />
			))}
		</div>
	)
}

export async function getStaticProps() {
	const restaurantSlug = 'la-pizzeria'
	const categorySlug = 'insalata'
	const itemSlug = 'crudo'
	const item = await getFullItem({ restaurantSlug, categorySlug, itemSlug })

	if (!item) {
		return {
			notFound: true,
		}
	}

	return {
		props: { item },
		revalidate: 5,
	}
}
