import BookingForm from 'components/booking/booking-form'
import Container from 'components/layout/container'
import Header from 'components/layout/header'
import BackButton from 'components/ui/back'

export default function BookingPage() {
	return (
		<>
			<Container>
				<BackButton />
				<h1>Réservation</h1>
				<BookingForm message="Merci de préciser dans l'espace commentaire plus bas si vous souhaitez être placés en terrasse" />
			</Container>
			<Header />
		</>
	)
}
