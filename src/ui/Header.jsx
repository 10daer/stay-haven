import styled from "styled-components";
import { devices } from "../styles/MediaQueries";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";
import { useUser } from "../hooks/Authentication/useUser";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem 1.2rem 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;

  /* @media ${devices.md} {
    font-size: 1rem;
    padding: 0.8rem 2.8rem;
  } */
`;

function Header() {
  const {
    user: {
      user_metadata: { avatar, fullName },
    },
  } = useUser();

  return (
    <StyledHeader>
      <UserAvatar avatar={avatar} user={fullName} />
      {/* <UserAvatar avatar="" user="" /> */}
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
