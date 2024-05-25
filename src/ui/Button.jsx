import styled, { css } from "styled-components";
import { devices } from "../styles/MediaQueries";
import { SpinnerMini } from "./Spinner";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
    &:disabled {
      background-color: var(--color-brand-300);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
    &:disabled {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
    &:disabled {
      background-color: var(--color-red-300);
    }
  `,
};

const StyledButton = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  display: flex;
  justify-content: center;
  width: fit-content;
  align-items: center;
  align-self: flex-end;
  gap: 8px;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}

  @media ${devices.md} {
    font-size: 1.6rem;
    padding: 0.8rem 1rem;
    font-weight: 600;
    text-align: center;
  }
`;

StyledButton.defaultProps = {
  variation: "primary",
  size: "medium",
};

function Button({
  variation,
  to,
  as,
  size,
  type,
  children,
  disabled,
  onClick,
}) {
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      variation={variation}
      type={type}
      size={size}
      as={as}
      to={to}
    >
      {disabled && <SpinnerMini />}
      {children}
    </StyledButton>
  );
}

export default Button;
