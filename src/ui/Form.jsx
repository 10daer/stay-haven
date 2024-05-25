import styled, { css } from "styled-components";
import { devices } from "../styles/MediaQueries";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2rem 3.2rem;
      overflow: hidden;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      overflow: hidden;

      @media ${devices.md} {
        width: 70vw;
      }
    `}

    ${(props) =>
    props.type === "auth" &&
    css`
      background-color: var(--color-grey-200);
      border-radius: var(--border-radius-md);
      display: flex;
      flex-direction: column;
      width: 48vw;
      max-width: 40rem;
      min-width: 28rem;
      padding: 2rem 1rem;
      overflow: hidden;
    `}

    ${(props) =>
    props.type === "create-booking" &&
    css`
      padding: 2rem 3.2rem;
      overflow: hidden;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      height: 74vh;
      overflow: scroll;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 0 !important;
      }
      scrollbar-width: none;
      -ms-overflow-style: none;
    `}
    
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
