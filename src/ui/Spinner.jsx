import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;
3;

const Spinner = styled.span`
  ${(props) =>
    props.type === "dashboard"
      ? css`
          margin: 10vh auto;
        `
      : css`
          margin: 25.25vh auto;
        `}
  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;

export const SpinnerMini = styled.span`
  aspect-ratio: 1;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${rotate} 1.5s linear infinite;

  ${(props) =>
    props.type === "dashboard" &&
    css`
      border: 4px dotted var(--color-blue-700);
      width: 28px;
      margin-left: 8px;
    `}

  ${(props) =>
    props.type === "menu" &&
    css`
      border: 2px dotted var(--color-brand-800);
      width: 16px;
    `}

    ${(props) =>
    props.type === "" &&
    css`
      border: 3px dotted var(--color-grey-800);
      width: 21px;
    `}
`;

SpinnerMini.defaultProps = {
  type: "",
};

export default Spinner;
