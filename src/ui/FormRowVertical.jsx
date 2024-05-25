import styled, { css } from "styled-components";

export const StyledInput = styled.input`
  height: 4.8rem;
  width: 100%;
  font-size: 1.6rem;
  font-weight: 400;
  outline: 1px solid var(--color-brand-300);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-800);
  background-color: var(--color-grey-200);
  border: none;
  padding: 0.6rem 4rem 0.6rem 1.2rem;
  transition: all 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    top: 2.2rem;
    font-size: 1.6rem;
    font-weight: 500;
    background-color: transparent;
    color: var(--color-grey-800);
    cursor: text;
  }

  &:focus {
    outline: 2px solid var(--color-brand-600);
  }

  &:focus ~ label {
    position: absolute;
    top: 0.16rem;
    left: 3rem;
    padding: 0 0.4rem;
    font-size: 1.36rem;
    font-weight: 700;
    background-color: var(--color-grey-200);
    color: var(--color-grey-800);
    display: block;
    transition: 0.3s;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  top: 0.16rem;
  left: 3rem;
  padding: 0 0.4rem;
  font-size: 1.36rem;
  font-weight: 700;
  background-color: var(--color-grey-200);
  color: var(--color-grey-800);
  display: block;
  transition: 0.3s;
`;

export const StyledImage = styled.img`
  position: absolute;
  right: 1.6rem;
  bottom: 2.4rem;
  width: 28px;
  height: 28px;
  transform: translate(-50%, -50%);
  transform-origin: center;

  ${(props) =>
    props.imgType === "password" &&
    css`
      cursor: pointer;
    `}
`;

const StyledFormRow = styled.div`
  position: relative;
  padding: 1rem 1.2rem;
  display: flex;
  font-size: 1.6rem;
  flex-direction: column;

  p {
    font-size: 1.2rem;
    color: #ed0505;
    font-weight: 600;
    margin-left: 1rem;
    height: 18px;
  }
`;

function FormRowVertical({ children, label, error }) {
  return (
    <StyledFormRow>
      {children}
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <p>{error ? ` ❌ ${error}` : ""}</p>
    </StyledFormRow>
  );
}

export default FormRowVertical;
