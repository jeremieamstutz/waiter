import CategoryForm from 'components/category/category-form'

import classes from 'styles/new-category.module.css'

export default function NewCategoryPage() {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>New category</h1>
			<CategoryForm />
		</div>
	)
}
