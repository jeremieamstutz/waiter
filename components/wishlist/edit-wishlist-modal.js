import CheckboxGroup, { Checkbox } from 'components/form/checkbox'
import Input from 'components/form/input'
import Textarea from 'components/form/textarea'
import Modal from 'components/ui/modal'
import { Form, Formik } from 'formik'
import { useId } from 'react'
import { bool, object, string } from 'yup'

const MAX_LENGTH = 30

export default function EditWishlistModal({ wishlist, onClose }) {
	const formId = useId()

	return (
		<Formik
			initialValues={{
				name: wishlist?.name ?? '',
				description: wishlist?.description ?? '',
				public: wishlist?.public ?? false,
			}}
			validationSchema={object({
				name: string()
					.max(MAX_LENGTH, MAX_LENGTH + ' characters max')
					.required('Name is required'),
				description: string().max(512),
				public: bool().required(),
			})}
			onSubmit={(values) => {
				console.log(values)
			}}
		>
			{({ values }) => (
				<Modal
					title={wishlist ? 'Edit wishlist' : 'New wishlist'}
					onClose={onClose}
					footer={
						<>
							<button type="button" onClick={onClose}>
								Cancel
							</button>
							<button
								type="submit"
								className="secondary"
								form={formId}
							>
								Save
							</button>
						</>
					}
				>
					<Form id={formId}>
						<Input
							type="text"
							name="name"
							label="Name"
							help={
								<div
									style={{
										fontFamily: 'Rubik',
										color:
											values.name.length <= MAX_LENGTH
												? '#666'
												: 'var(--color-danger)',
									}}
								>{`${values.name.length}/${MAX_LENGTH}`}</div>
							}
						/>
						<Textarea
							name="description"
							label="Description"
							rows={3}
						/>
						<Checkbox name="public" label="Public" />
					</Form>
				</Modal>
			)}
		</Formik>
	)
}
