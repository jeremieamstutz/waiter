import ItemForm from 'components/item/item-form'

import classes from 'styles/new-category.module.css'

export default function NewRestaurant() {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>New category</h1>
			<ItemForm />
		</div>
	)
}
