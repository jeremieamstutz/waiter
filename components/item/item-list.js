import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'

import ItemCard, { NewItemCard } from './item-card'
import Sheet from 'components/ui/sheet'

import classes from './item-list.module.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function ItemList({ category, items }) {
	const router = useRouter()
	const { data: session, status } = useSession()

	const [showSheet, setShowSheet] = useState(false)

	const handleDeleteCategory = async () => {
		await axios.delete(`/api/categories/${category.id}`)
		router.reload()
	}
	return (
		<section className={classes.container}>
			<div className={classes.header}>
				<div className={classes.body}>
					<h2 className={classes.name}>{category.name}</h2>
					<p className={classes.description}>
						{category.description}
					</p>
				</div>
				{status === 'authenticated' && (
					<button
						className={classes.actions}
						onClick={() => setShowSheet(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
							/>
						</svg>
					</button>
				)}
				<Sheet show={showSheet} onClose={() => setShowSheet(false)}>
					{/* <h2 style={{margin: 0, marginBottom: '0.75rem', textAlign: 'center'}}>Options</h2> */}
					<Link
						href={{
							pathname: '[restaurantSlug]/items/new',
							query: {
								restaurantSlug: router.query.restaurantSlug,
								category: category.id,
							},
						}}
					>
						<a className="button">New item</a>
					</Link>
					<Link
						href={{
							pathname: `${router.pathname}/categories/[categoryId]/edit`,
							query: {
								...router.query,
								categoryId: category.id,
							},
						}}
					>
						<a className="button">Edit category</a>
					</Link>
					<button className="button" onClick={handleDeleteCategory}>
						Delete category
					</button>
					{/* <Link
							href={{
								pathname: router.pathname + '/new-category',
								query: {
									...router.query,
								},
							}}
						>
							<a className="button">New category</a>
						</Link> */}
					<button
						className="button secondary"
						onClick={() => setShowSheet(false)}
						style={{ marginTop: '0.75rem' }}
					>
						Cancel
					</button>
				</Sheet>
			</div>
			<div className={classes.list}>
				{items.map((item, index) => (
					<ItemCard item={item} key={index} />
				))}
				{status === 'authenticated' && (
					<NewItemCard category={category.id} />
				)}
			</div>
		</section>
	)
}
