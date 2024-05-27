import styled, { css } from "styled-components";
import { devices } from "../styles/MediaQueries";
import GlobalTypes from "../utils/GlobalType";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  gap: 2.4rem;

  padding: 1.2rem 0;

  ${(prop) =>
    prop.type === "modal"
      ? css`
          grid-template-columns: 14rem 1.2fr 1fr;
        `
      : css`
          grid-template-columns: 24rem 1.2fr 1fr;
        `}

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    ${(prop) =>
      prop.as !== "div" &&
      css`
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      `}
  }

  & > div {
    ${(prop) =>
      prop.label === "Guest's Nationality" &&
      css`
        width: -webkit-fill-available;
      `}
  }

  @media ${devices.md} {
    ${(prop) =>
      prop.type === "modal"
        ? css`
            grid-template-columns: 10rem 1.2fr 1fr;
          `
        : css`
            grid-template-columns: 16rem 1.2fr 1;
          `}
    gap: 0.8rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  ${(prop) =>
    prop.as === "div" &&
    css`
      display: contents;

      & span {
        margin-left: 2rem;
      }
    `}
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

FormRow.propTypes = GlobalTypes;


function FormRow({ type, children, as, label, name, error }) {
  return (
    <StyledFormRow label={label} type={type} as={as}>
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error && <Error as={as}>{error.message}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
