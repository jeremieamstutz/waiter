import ItemForm from 'components/item/item-form'

import classes from 'styles/new-item.module.css'

export default function NewRestaurant() {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>New item</h1>
			<ItemForm />
		</div>
	)
}
