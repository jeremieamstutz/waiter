import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import classes from './footer.module.css'

export default function Footer() {
	const { t } = useTranslation()
	return (
		<>
			{/* <footer className={classes.footer}>
				<h3 className={classes.title}>
					Powered by{' '}
					<Link href="/">
						<a className={classes.brand}>waiter.so</a>
					</Link>
				</h3>
				<div className={classes.links}>
					<Link href="/terms">
						<a className={classes.link}>Terms & Privacy</a>
					</Link>
				</div>
				<p className={classes.slogan}>Commandez en ligne. Dégustez sur place.</p>
			</footer> */}

			<footer className={classes.footer}>
				<div
					style={{
						fontSize: '1.125rem',
						textAlign: 'center',
						color: '#666',
					}}
				>
					<span>{t('common:footer.trademark.madeWith')}</span>{' '}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={16}
						height={16}
						viewBox="0 0 20 20"
						fill="#222"
						style={{ marginBottom: '-0.125rem' }}
					>
						<path
							fillRule="evenodd"
							d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
							clipRule="evenodd"
						/>
					</svg>{' '}
					<span>{t('common:footer.trademark.by')}</span>{' '}
					<a
						href="https://www.linkedin.com/in/jérémie-amstutz/"
						style={{ color: '#222' }}
					>
						Jérémie Amstutz
					</a>{' '}
					<span>{t('common:footer.trademark.inLausanne')}</span>
				</div>
				<div
					style={{
						display: 'flex',
						gap: '0.5rem 1.5rem',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#666',
						flexWrap: 'wrap',
					}}
				>
					<Link href="/about">
						<a style={{ fontSize: '1.125rem', color: '#666' }}>
							{t('common:footer:links:about')}
						</a>
					</Link>
					<Link href="/faq">
						<a style={{ fontSize: '1.125rem', color: '#666' }}>
							FAQ
						</a>
					</Link>
					{/* <Link href="/help">
						<a style={{ fontSize: '1.125rem', color: '#666' }}>
							{t('common:footer:links:help')}
						</a>
					</Link>
					<Link href="/jobs">
						<a
							style={{
								fontSize: '1.125rem',
								color: '#666',
								position: 'relative',
							}}
						>
							{t('common:footer:links:jobs')}
							<div
								style={{
									position: 'absolute',
									width: '5px',
									height: '5px',
									background: 'var(--color-ui-primary)',
									top: 1,
									right: -4,
									borderRadius: '50%',
								}}
							/>
						</a>
					</Link>
					<Link href="/privacy">
						<a style={{ fontSize: '1.125rem', color: '#666' }}>
							{t('common:footer:links:privacy')}
						</a>
					</Link> */}
					<Link href="/terms">
						<a style={{ fontSize: '1.125rem', color: '#666' }}>
							{t('common:footer:links:terms')}
						</a>
					</Link>
					{/* <Link href="/changelog">
						<a style={{ fontSize: '1.125rem', color: '#666' }}>
							Changelog
						</a>
					</Link> */}
					<Link href="/metrics">
						<a style={{ fontSize: '1.125rem', color: '#666' }}>
							{t('common:footer:links:metrics')}
						</a>
					</Link>
				</div>
			</footer>
		</>
	)
}
