import styled from "styled-components";
import GlobalStyle from "../styles/GlobalStyles";
import Box from "../ui/Box";
import Heading from "./Heading";
import Button from "./Button";
import GlobalTypes from "../utils/GlobalType";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

ErrorFallback.propTypes = GlobalTypes;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <GlobalStyle>
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went wrong 😶</Heading>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try Again
          </Button>
        </Box>
      </StyledErrorFallback>
    </GlobalStyle>
  );
}

export default ErrorFallback;
