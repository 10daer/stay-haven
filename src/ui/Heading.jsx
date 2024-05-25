import styled, { css } from "styled-components";
import { devices } from "../styles/MediaQueries";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;

      & span {
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--color-yellow-700);
      }
    `}
    
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    ${(props) =>
    props.as === "h5" &&
    css`
      font-size: 1.5rem;
      font-weight: 500;
      font-style: italic;
    `}
    
  line-height: 1.4;

  @media ${devices.md} {
    font-size: 2.4rem;
    font-weight: 600;
  }
`;

export default Heading;
