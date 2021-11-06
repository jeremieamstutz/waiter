import Container from "components/layout/container";
import UserForm from "components/user/user-form";

export default function NewUserPage() {
    return (
        <Container>
            <h1>New user</h1>
            <UserForm />
        </Container>
    )
}