import styled from "styled-components";
import { devices } from "../styles/MediaQueries";
import { useGlobalContext } from "../context/useGlobalContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;

  @media ${devices.md} {
    height: 6.8rem;
    width: 8rem;
  }
`;

function Logo() {
  const { isDarkMode } = useGlobalContext();
  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
