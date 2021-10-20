import useLongPress from 'hooks/useLongPress'
import Image from 'next/image'
import { useState } from 'react'

import classes from './item-card.module.css'

export default function Item({ item }) {
	const [quantity, setQuantity] = useState(0)

	const handleIncreaseQuantity = (event) => {
		event.preventDefault()
		setQuantity((prevQuantity) => prevQuantity + 1)
	}

	const handleDecreaseQuantity = (event) => {
		event.preventDefault()
		setQuantity((prevQuantity) => prevQuantity - 1)
	}

	const longPressProps = useLongPress({
		onClick: (event) => {
			if (event.cancelable) {
				event.preventDefault()
			}
			handleIncreaseQuantity(event)
		},
		onLongPress: (event) => {
			if (event.cancelable) {
				event.preventDefault()
			}
			prompt('Enter quantity')
		},
		delay: 500,
	})

	return (
		<div className={classes.container}>
			<div className={classes.image}>
				{/* <div
					className={classes.picker}
					onClick={(event) => event.preventDefault()}
				>
					<span onClick={handleIncreaseQuantity}>
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
								strokeWidth={3}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</span>
					{quantity > 0 && (
						<>
							<span>{quantity}</span>
							<span onClick={handleDecreaseQuantity}>
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
										strokeWidth={3}
										d="M20 12H4"
									/>
								</svg>
							</span>
						</>
					)}
				</div> */}
				<Image
					src={item.image}
					alt={item.name}
					layout="fill"
					objectFit="cover"
					objectPosition="left"
					width={168}
					height={256}
					priority={true}
				/>
			</div>
			<h3 className={classes.title}>{item.name}</h3>
			<p className={classes.description}>{item.description}</p>
			<p className={classes.details}>
				<span className={classes.price}>
					CHF {parseFloat(item.price).toFixed(2)}
				</span>
				{/* <span className={classes.grade}>
					{(2 * Math.random() + 3).toFixed(2)}
				</span> */}
				{/* {quantity > 0 ? (
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
							strokeWidth={3}
							d="M20 12H4"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={20}
						height={20}
						fill="none"
						viewBox="0 0 24 24"
						stroke="#000000"
						style={{ marginRight: '0.5rem' }}
						{...longPressProps}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={3}
							d="M12 4v16m8-8H4"
						/>
					</svg>
				)} */}
			</p>
		</div>
	)
}
