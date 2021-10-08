import Image from 'next/image'

import classes from './item-card.module.css'

export default function Item({ item }) {
	return (
		<div className={classes.container}>
			<Image
				className={classes.image}
				src={item.image}
				alt={item.name}
				objectFit="cover"
				objectPosition="left"
				width={144}
				height={192}
			/>
			<h3 className={classes.title}>{item.name}</h3>
			<p className={classes.description}>{item.description}</p>
			<p className={classes.details}>
				<span className={classes.price}>
					CHF {parseFloat(item.price).toFixed(2)}
				</span>
				<span className={classes.grade}>
					{(2 * Math.random() + 3).toFixed(2)}
				</span>
			</p>
		</div>
	)
}
