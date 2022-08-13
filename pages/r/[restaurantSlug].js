export default function ShortLinkPage() {
	return <div>Redirecting...</div>
}

export async function getServerSideProps({ params }) {
	const { restaurantSlug } = params
	return {
		redirect: {
			destination: `/restaurants/${restaurantSlug}`,
			permanent: false,
		},
	}
}
