import GlobeIcon from 'components/icons/globe'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import track from 'utils/track'

const FLAGS = {
	en: '🇬🇧',
	fr: '🇫🇷',
	de: '🇩🇪',
}

export default function LanguageSelector() {
	const router = useRouter()
	const selectRef = useRef()

	return (
		<div
			style={{
				position: 'relative',
				cursor: 'pointer',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			onClick={() => selectRef.current.click()}
		>
			<div style={{ fontSize: '1.35rem' }}>{FLAGS[router.locale]}</div>
			<select
				ref={selectRef}
				value={router.locale}
				onChange={(event) => {
					router.push(router.asPath, undefined, {
						locale: event.target.value,
					})

					track.event({
						event_category: 'navigation',
						event_name: 'change_language',
						event_label: event.target.value,
					})
				}}
				style={{
					appearance: 'none',
					position: 'absolute',
					inset: 0,
					opacity: 0,
					cursor: 'pointer',
				}}
			>
				<option value="en">English</option>
				<option value="fr">Français</option>
				<option value="de">Deutsch</option>
			</select>
		</div>
	)
}
