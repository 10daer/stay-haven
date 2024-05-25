import styled, { css } from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }

  ${(prop) =>
    prop.name === "add-guest" &&
    css`
      background-color: var(--color-blue-100);
      border: none;
      padding: 0.6rem;
      border-radius: var(--border-radius-sm);
      transition: all 0.2s;

      &:hover {
        background-color: var(--color-brand-700);
      }

      & svg {
        width: 2.8rem;
        height: 2.2rem;
        color: var(--color-grey-900);
      }
    `}
`;

export default ButtonIcon;
