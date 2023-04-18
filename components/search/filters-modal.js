import { useState } from 'react'
import { useFormikContext } from 'formik'

import CUISINES from 'constants/cuisines'

import Modal from 'components/ui/modal'

import CheckboxGroup from 'components/form/checkbox'
import Range from 'components/form/range'
import TagsGroup from 'components/form/tags'
import { useTranslation } from 'next-i18next'

export default function FiltersModal({ onClose }) {
	const { t } = useTranslation()
	const [showMoreCuisines, setShowMoreCuisines] = useState(false)

	return (
		<Modal
			title={t('search:modals.filters.title')}
			onClose={onClose}
			footer={
				<>
					<button
						className="secondary"
						type="submit"
						onClick={onClose}
						style={{ flex: 1 }}
					>
						{t('search:modals.filters.actions.showRestaurants')}
					</button>
				</>
			}
		>
			<CheckboxGroup
				name="cuisines"
				label={t('search:modals.filters.cuisines.label')}
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
				}}
			>
				{CUISINES.map((cuisine, index) => {
					if ((!showMoreCuisines && index < 11) || showMoreCuisines)
						return (
							<CheckboxGroup.Item value={cuisine} key={cuisine}>
								{t('restaurant:cuisines.' + cuisine)}
							</CheckboxGroup.Item>
						)
				})}
				<button
					className="text"
					onClick={() => setShowMoreCuisines(!showMoreCuisines)}
					style={{ fontSize: '1.125rem' }}
				>
					{!showMoreCuisines
						? '+ ' +
						  t('search:modals.filters.cuisines.actions.showMore')
						: '- ' +
						  t('search:modals.filters.cuisines.actions.showLess')}
				</button>
			</CheckboxGroup>
			{/* <Range name="price" label="Price" min={0} max={100} step={1} /> */}
			{/* <TagsGroup name="reviews" label="Reviews">
				<TagsGroup.Item value={1}>1</TagsGroup.Item>
				<TagsGroup.Item value={1.5}>1.5</TagsGroup.Item>
				<TagsGroup.Item value={2}>2</TagsGroup.Item>
				<TagsGroup.Item value={2.5}>2.5</TagsGroup.Item>
				<TagsGroup.Item value={3}>3</TagsGroup.Item>
				<TagsGroup.Item value={3.5}>3.5</TagsGroup.Item>
				<TagsGroup.Item value={4}>4</TagsGroup.Item>
				<TagsGroup.Item value={4.5}>4.5</TagsGroup.Item>
				<TagsGroup.Item value={5}>5</TagsGroup.Item>
			</TagsGroup> */}
		</Modal>
	)
}
