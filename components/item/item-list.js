import Link from 'next/link'

import ItemCard from './item-card'

import classes from './item-list.module.css'
import { useRouter } from 'next/router'

export default function ItemList({ category, items }) {
	const router = useRouter()
	return (
		<section className={classes.container}>
			<div className={classes.header}>
				<div className={classes.body}>
					<h2 className={classes.name}>{category.name}</h2>
					<p className={classes.description}>
						{category.description}
					</p>
				</div>
				<button className={classes.actions}>
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
			</div>
			<div className={classes.list}>
				{/* <ItemCard
					item={{
						name: 'New item',
						description: 'Add a new item to Beef Burgers',
						price: 0,
						image: '/',
					}}
				/> */}
				{items.map((item, index) => (
					<Link
						href={{
							pathname: router.pathname + '/[itemSlug]',
							query: {
								...router.query,
								itemSlug: item.slug,
							},
						}}
						key={index}
					>
						<a>
							<ItemCard item={item} />
						</a>
					</Link>
				))}
			</div>
		</section>
	)
}
