import sequelize from 'db'
import { Restaurant } from 'db/models'
import { useState } from 'react'

export default function POS({ restaurant }) {
	let { categories, items } = restaurant

	const [selectedCategory, setSelectedCategory] = useState(categories[0].id)
	const selectedItems = items.filter(
		(itm) => itm.categoryId === selectedCategory,
	)

	return (
		<div style={{ background: '#eee' }}>
			<section
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					padding: '2rem',
				}}
			>
				<div
					style={{
						display: 'flex',
						// flexDirection: 'column',
						// flexWrap: 'wrap',
						gap: '1rem',
						// height: '100vh',
						overflow: 'scroll',
						// width: '20rem',
						// flexShrink: 0,
					}}
				>
					{categories.map((category) => (
						<div
							key={category.id}
							onClick={() => setSelectedCategory(category.id)}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '1rem',
								padding: '1rem',
								borderRadius: '0.5rem',
								background:
									selectedCategory === category.id
										? '#ddd'
										: 'transparent',
								cursor: 'pointer',
							}}
						>
							<span>{category.name}</span>
							<span
								style={{
									background: '#ccc',
									padding: '0.25rem 0.75rem',
									borderRadius: '1rem',
								}}
							>
								{
									items.filter(
										(itm) => itm.categoryId === category.id,
									).length
								}
							</span>
						</div>
					))}
				</div>
				<div
					style={{
						display: 'flex',
						gap: '1rem',
						flexWrap: 'wrap',
						alignItems: 'center',
						alignSelf: 'start',
					}}
				>
					{selectedItems.map((item) => (
						<div
							key={item.id}
							style={{
								background: '#fff',
								borderRadius: '0.5rem',
								width: '16rem',
								height: '8rem',
								padding: '1rem',
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
							}}
						>
							<span style={{ fontSize: '1.125rem' }}>
								{item.name}
							</span>
							<span style={{ fontSize: '1.125rem' }}>
								{item.price}
							</span>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export async function getStaticProps() {
	const restaurantId = '9b1c3548-846b-4059-b1ad-64d2360f70bd'
	const restaurant = await Restaurant.findOne({
		order: sequelize.random(),
		include: ['categories', 'items'],
	})

	return {
		props: {
			restaurant: JSON.parse(JSON.stringify(restaurant)),
		},
	}
}
