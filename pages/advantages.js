import Container from 'components/layout/container'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import classes from 'styles/advantages.module.css'

export default function AdvantagesPage() {
	const { data: session, status } = useSession()

	return (
		<>
			<Container>
				<h1>Avantages</h1>
				<p style={{ margin: '0 0 0.5rem' }}>
					Que vous soyez restaurateur ou client, Waiter saura vous
					accompagner.
				</p>
				<h2 className={classes.header}>Restaurateurs</h2>
				<div className={classes.list}>
					{DATA['restaurateurs'].map((advantage, index) => (
						<div className={classes.card} key={index}>
							<div
								className={classes.icon}
								dangerouslySetInnerHTML={{
									__html: advantage.icon,
								}}
							/>
							<h3
								className={classes.title}
								dangerouslySetInnerHTML={{
									__html: advantage.title,
								}}
							/>
							<p
								className={classes.description}
								dangerouslySetInnerHTML={{
									__html: advantage.description,
								}}
							/>
						</div>
					))}
				</div>
				<h2 className={classes.header}>Clients</h2>
				<div className={classes.list}>
					{DATA['customers'].map((advantage, index) => (
						<div className={classes.card} key={index}>
							<div
								className={classes.icon}
								dangerouslySetInnerHTML={{
									__html: advantage.icon,
								}}
							/>
							<h3
								className={classes.title}
								dangerouslySetInnerHTML={{
									__html: advantage.title,
								}}
							/>
							<p
								className={classes.description}
								dangerouslySetInnerHTML={{
									__html: advantage.description,
								}}
							/>
						</div>
					))}
				</div>
				{/* <section className={classes.photos}>
					<h2>Immortalisez vos produits</h2>
					<p>
						Afin de maximiser vos chances sur la plateforme, des
						photographies irréprochables sont requises.
					</p>
					<p>
						En passant par nous vous bénéficierez (en plus
						d&apos;excellentes photos) d&apos;une présence gratuite sur
						<Link href="/"> Waiter.so </Link>pendant 6 mois.
					</p>
					<h3 className={classes.prices}>Prix du shooting</h3>
					<ul>
						<li>
							<p>
								Frais de déplacement (Lausanne et environs) et
								d&apos;installation
							</p>
							<div className={classes.price}>CHF 60.-</div>
						</li>
						<li>
							<p>Repérages et photographies du lieu</p>
							<div className={classes.price}>CHF 20.-</div>
						</li>
						<li>
							<p>Photos, tri et retouches des éléments</p>
							<div className={classes.price}>
								CHF 10.-/élément
							</div>
						</li>
					</ul>
					<p>
						Ces photos sont les vôtres ! Utilisez les pour Waiter,
						mais aussi vos réseaux sociaux, votre site internet, ou
						même un service de livraison.
					</p>
				</section>
				<section className={classes.subscription}>
					<h2>Abonnement à Waiter</h2>
					<p>
						L&apos;accès à la plateforme pour les restaurants se fait via
						un abonnement dont le prix commence à 
						<span className={classes.price}> CHF 30.-/mois</span>.
					</p>
					<p>
						Le prix augmentera ensuite graduellement en fonction du
						nombre de restaurants présents. Soyez donc parmis les
						premiers pour bénéficier d&apos;un prix avantageux !
					</p>
				</section> */}
				<section className={classes.cta}>
					<h2>Intéressé ?</h2>
					<p>Contactez nous sans tarder !</p>
					<a href="mailto:contact@waiter.so" className="button">Envoyer un mail</a>
					{/* <a href="mailto:contact@waiter.so">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width={24}
							height={24}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
						contact@waiter.so
					</a> */}
				</section>
				{/* <div className={classes.cta}>
					<h3>Convaincu ?</h3>
					<p>Alors rejoignez Waiter sans tarder !</p>
					<Link
						href={
							session
								? {
										pathname: '/new-restaurant',
								  }
								: {
										pathname: '/account/login',
										query: {
											callbackUrl:
												process.env.NEXT_PUBLIC_DOMAIN +
												'/new-restaurant',
										},
								  }
						}
					>
						<a className="button" style={{ background: 'white' }}>
							S&apos;inscrire
						</a>
					</Link>
				</div> */}
				{/* <div className={classes.faq}>
					<h3>Une interrogation ?</h3>
					<p>
						{' '}
						<Link href={{ pathname: '/faq' }}>
							Consultez la foire aux questions
						</Link>
					</p>
				</div> */}
			</Container>
		</>
	)
}

const DATA = {
	restaurateurs: [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
		  </svg>`,
			title: 'Investissement minimal, mais payant',
			description:
				"Moderniser la gestion des commandes serait forcément coûteux ? Fini l'achat et la maintenance de bornes tactiles qui prennent trop de place. Grâce à Waiter, le client se sert de son propre smartphone pour passer commande. Non pas debout, mais confortablement installé à sa table.",
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
		  </svg>`,
			title: 'Gérez votre main d’œuvre au mieux',
			description:
				'Payer un employé pour taper les commandes sur un écran tactile ? Alors que le client pourrait le faire sur Waiter en s’épargnant la queue et l’attente ? Recentrez votre main d’œuvre sur ce qui apporte une véritable plus-value à votre établissement, ou faites simplement des économies en la réduisant.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
		  </svg>`,
			title: 'Le plus important : le contact client',
			description:
				'Waiter vous permet de communiquer directement avec vos clients. Faites leur part de vos offres, de la mise à jour de votre carte, d’événements spéciaux, via une simple notification. Bien-sûr, vous pouvez tout aussi bien faire des campagnes de promotion destinées à de nouveaux clients.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		  </svg>`,
			title: 'Optimisez vos revenus',
			description:
				'Comme il y a moins d’attente pour le client, il reste moins longtemps à table, et les services s’enchaînent plus rapidement. En plus, les données numériques tirées des commandes vous permettent d’optimisez vos stocks. Or, réduire le gaspillage, c’est bon pour la planète et pour votre porte-monnaie.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
		  </svg>`,
			title: 'Assurez-vous d’être vu',
			description:
				'La visibilité d’un établissement doit s’affranchir de son emplacement. Waiter ne se contente pas de présenter votre carte et l’image des plats, mais aussi des photographies de votre restaurant. Un vrai plus qui s’inscrit dans l’intention de privilégier la consommation sur place, le cœur de votre métier.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
		  </svg>`,
			title: 'Carte dynamique',
			description:
				'Adaptez votre carte en toute facilité, selon vos besoins. Que ce soit la saison de la chasse, une offre spéciale, ou simplement le plat du jour, offrez à vos clients une carte qui soit toujours actualisée. Vous avez même la possibilité d’adapter vos prix selon la fréquentation, le jour ou l’heure de la journée.',
		},
	],
	customers: [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
		  </svg>`,
			title: 'Votre fidélité compte',
			description:
				'Fini le temps des dizaines de cartes qu’on oublie toujours. Grâce à l’historique de vos commandes, votre carte de fidélité est directement intégrée à votre compte. Il ne revient plus qu’au restaurateur de définir vos récompenses en guise de remerciements, et à vous d’en profiter.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
		  </svg>`,
			title: 'Réservez en un clic',
			description:
				'Plus besoin d’essuyer dix refus par téléphone pour réserver une table à la Saint-Valentin. Grâce aux réservations en ligne, vous avez directement accès à toutes les disponibilités. Vous pouvez réserver en dehors des heures d’ouverture de l’établissement, et sans attendre que quelqu’un décroche.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
		  </svg>`,
			title: 'Prenez place, <span style="text-decoration: line-through;">attendez</span>, dégustez',
			description:
				'Avec les commandes en ligne que vous pouvez même passer en avance, vous vous assurez d’être servi le plus rapidement possible. Idéal pour une courte pause de midi ou lorsque vous allez manger avec vos enfants. Waiter vous offre le temps de passer un bon moment.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
		  </svg>`,
			title: 'Le menu, réinventé',
			description:
				'Traduit en plusieurs langues, possibilité d’afficher une brève description des plats, leur composition ou d’autres informations, tel que l’accord met-vin, il n’aura jamais été aussi facile de faire son choix. Et comme si cela ne suffisait pas pour avoir envie d’y goûter, chaque plat est accompagné d’une photo.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
		  </svg>`,
			title: 'Ne cherchez plus. Trouvez.',
			description:
				'Waiter est un outil de recherche puissant. Laissez-vous guider par vos envies et trouvez où déguster ce qui vous tente. Au-delà de l’aspect pratique, les allergiques, intolérants, vegans et autres, sauront à quel point il est important de pouvoir trouver toutes les informations relatives à ce que nous mangeons.',
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
		  </svg>`,
			title: 'Transparence et contrôle',
			description:
				'Adieu les frais cachés, tels que des carafes d’eau à prix prohibitif. Vous gardez la main sur votre porte-monnaie. Vous pouvez vérifier à tout instant le montant de ce que vous avez déjà commandé. En partant, réglez en toute discrétion vis-à-vis de vos invités, ou partagez l’addition comme il vous convient.',
		},
	],
}
