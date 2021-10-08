import Footer from 'components/layout/footer'
import { DateTime } from 'luxon'

import classes from 'styles/changelog.module.css'

export default function ChangelogPage({ logs }) {
	return (
		<>
			<div className={classes.container}>
				<h1 className={classes.header}>Changelog</h1>
				<div className={classes.logs}>
					{logs.map((log, index) => (
						<article className={classes.log} key={index}>
							<div className={classes.date}>{log.date}</div>
							<h2 className={classes.title}>{log.title}</h2>
							<p className={classes.text}>{log.text}</p>
						</article>
					))}
				</div>
			</div>
			<Footer />
		</>
	)
}

export async function getStaticProps() {
	return {
		props: {
			logs: [
				{
					date: DateTime.now().toLocaleString(),
					title: 'Order right from your table',
					text: 'We work hard to create the best possible version of Waiter. We hope you appreciate it',
				},
				{
					date: DateTime.now().toLocaleString(),
					title: 'The menu in your language',
					text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in ullamcorper neque, ut auctor felis. Sed pharetra, urna in mattis imperdiet, lorem tortor maximus risus, id aliquam purus nibh in neque. Mauris et enim id justo lobortis venenatis non eu erat. Quisque vel lorem ullamcorper, varius metus id, malesuada dui.',
				},
			],
		},
	}
}
