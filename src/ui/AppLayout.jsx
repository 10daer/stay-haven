import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { devices } from "../styles/MediaQueries";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media ${devices.md} {
    grid-template-columns: 9rem 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2.8rem 4.8rem 1.2rem;

  @media ${devices.md} {
    padding: 2.4rem 2.4rem 0.6rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
