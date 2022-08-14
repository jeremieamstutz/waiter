import { useState } from 'react'
import { Form, Formik } from 'formik'

import Modal from 'components/ui/modal'

import CheckboxGroup from 'components/form/checkbox'
import Range from 'components/form/range'
import TagsGroup from 'components/form/tags'

const CUISINES = [
	'healthy',
	'vegetarian',
	'homemade',
	'brunch',
	'french',
	'swiss',
	'american',
	'italian',
	'chinese',
	'japanese',
	'mexican',
	'british',
	'mediterranean',
	'hungarian',
	'lebanese',
	'vietnamese',
	'spanish',
	'korean',
	'moroccan',
	'hawaiian',
	'thai',
	'indian',
	'portugese',
	'caribbean',
	'greek',
	'german',
	'peruvian',
	'russian',
	'australian',
]

export default function FiltersModal({ onClose }) {
	const [showMoreCuisines, setShowMoreCuisines] = useState(false)

	return (
		<Formik initialValues={{ price: [10, 50] }}>
			<Modal
				title="Filters"
				onClose={onClose}
				footer={
					<>
						<button>Clear all</button>
						<button className="secondary">
							Filter restaurants
						</button>
					</>
				}
			>
				<Form>
					<CheckboxGroup
						name="cuisines"
						label="Cuisines"
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
						}}
					>
						{CUISINES.map((cuisine, index) => {
							if (
								(!showMoreCuisines && index < 11) ||
								showMoreCuisines
							)
								return (
									<CheckboxGroup.Item
										value={cuisine}
										key={index}
										style={{
											textTransform: 'capitalize',
										}}
									>
										{cuisine}
									</CheckboxGroup.Item>
								)
						})}
						<button
							className="text"
							onClick={() =>
								setShowMoreCuisines(!showMoreCuisines)
							}
							style={{ fontSize: '1.125rem' }}
						>
							{!showMoreCuisines
								? '+ Show more cuisines'
								: '- Show less cuisines'}
						</button>
					</CheckboxGroup>
					<Range
						name="price"
						label="Price"
						min={0}
						max={100}
						step={1}
					/>
					<TagsGroup name="reviews" label="Reviews">
						<TagsGroup.Item value={1}>1</TagsGroup.Item>
						<TagsGroup.Item value={1.5}>1.5</TagsGroup.Item>
						<TagsGroup.Item value={2}>2</TagsGroup.Item>
						<TagsGroup.Item value={2.5}>2.5</TagsGroup.Item>
						<TagsGroup.Item value={3}>3</TagsGroup.Item>
						<TagsGroup.Item value={3.5}>3.5</TagsGroup.Item>
						<TagsGroup.Item value={4}>4</TagsGroup.Item>
						<TagsGroup.Item value={4.5}>4.5</TagsGroup.Item>
						<TagsGroup.Item value={5}>5</TagsGroup.Item>
					</TagsGroup>
				</Form>
			</Modal>
		</Formik>
	)
}
