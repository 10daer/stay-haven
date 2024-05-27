import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  padding: 8.8rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: center;
  gap: 1rem;
  width: 45rem;
  margin: auto;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login into your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
