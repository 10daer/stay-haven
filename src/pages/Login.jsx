import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  padding: 1.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100vh;
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
