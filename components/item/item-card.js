import VegetarianIcon from 'components/icons/vegetarian'
import Image from 'next/image'
import { useRouter } from 'next/router'

import classes from './item-card.module.css'

const TAGS = {
	vegetarian: (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: '#017F00',
				borderRadius: '0.75rem',
				color: 'white',
				width: '1.5rem',
				height: '1.5rem',
			}}
		>
			<VegetarianIcon width={12} fill="white" />
		</div>
	),
}

export default function ItemCard({ item }) {
	const router = useRouter()
	return (
		<div
			tabIndex="0"
			className={classes.card}
			onClick={() =>
				router.push(
					{
						pathname: router.pathname,
						query: {
							...router.query,
							item: item.id,
						},
					},
					undefined,
					{ shallow: true },
				)
			}
		>
			<div className={classes.body}>
				<h3 className={classes.title}>{item.name}</h3>
				<p className={classes.description}>{item.description}</p>
				<div
					style={{
						display: 'flex',
						gap: '1rem',
						alignItems: 'center',
					}}
				>
					<div className={classes.price}>
						{(+item.price).toFixed(2)}
					</div>
					{item.tags?.map((tag, index) => {
						switch (tag) {
							case 'vegetarian': {
								return (
									<div
										key={index}
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											background: '#017F00',
											borderRadius: '0.75rem',
											color: 'white',
											width: '1.5rem',
											height: '1.5rem',
										}}
									>
										<VegetarianIcon
											width={12}
											fill="white"
										/>
									</div>
								)
							}
						}
					})}
					{/* <div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: 'orange',
							borderRadius: '0.75rem',
							color: 'white',
							padding: '0.5rem',
							height: '1.5rem',
							fontSize: '0.9rem',
						}}
					>
						NEW
					</div> */}
				</div>
			</div>
			{item.image && (
				<div className={classes.image}>
					<Image
						alt={item.name}
						src={item.image ?? '/images/defaults/item.png'}
						width={128}
						height={128}
						style={{
							display: 'block',
							width: '100%',
							height: 'auto',
							aspectRatio: 1,
							objectFit: 'cover',
						}}
					/>
				</div>
			)}
		</div>
	)
}
