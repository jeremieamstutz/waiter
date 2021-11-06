import CategoryForm from 'components/category/category-form'

import { getCategory } from 'pages/api/categories/[categoryId]'

import classes from 'styles/new-category.module.css'

export default function EditCategoryPage({ category }) {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>Edit category</h1>
			<CategoryForm category={category} />
		</div>
	)
}

export async function getServerSideProps({ params }) {
	const { categoryId } = params
	const category = await getCategory(categoryId)

	if (!category) {
		return {
			notFound: true,
		}
	}

	return { props: { category } }
}