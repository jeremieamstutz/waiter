import Container from "components/layout/container";
import RestaurantForm from "components/restaurant/restaurant-form";

export default function NewRestaurantPage() {
    return (
        <Container>
            <h1>New restaurant</h1>
            <RestaurantForm />
        </Container>
    )
}