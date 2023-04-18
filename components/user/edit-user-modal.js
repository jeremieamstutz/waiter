import { useTranslation } from 'next-i18next'

import Modal from 'components/ui/modal'
import EditUserForm from './edit-user-form'

export default function EditUserModal({ user, onClose }) {
	const { t } = useTranslation()
	return (
		<Modal
			onClose={onClose}
			title={t('user:modals.editProfile.title')}
			footer={
				<>
					<button onClick={onClose}>
						{t('common:misc.actions.cancel')}
					</button>
					<button className="secondary" type="submit" form="user">
						{t('common:misc.actions.save')}
					</button>
				</>
			}
		>
			<EditUserForm user={user} onSubmit={onClose} />
		</Modal>
	)
}
