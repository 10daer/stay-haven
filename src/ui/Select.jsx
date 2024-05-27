import Select from "react-select";
import styled, { css } from "styled-components";

export const StyledSelect = styled(Select)`
  .react-select__control {
    border: 1px solid var(--color-grey-300) !important;
    background-color: var(--color-grey-0) !important;
    border-radius: var(--border-radius-sm) !important;
    padding: 0 0 0 0.4rem !important;
    box-shadow: var(--shadow-sm) !important;
    font-size: 1.5rem;
    height: 6rem;
    max-height: 60px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
  }

  .react-select__single-value {
    color: var(--color-grey-700);
  }

  .react-select__placeholder {
    ${(prop) =>
      prop.type === "add-guest" &&
      css`
        width: max-content;
      `}
  }

  .react-select__indicators {
    display: flex;
    flex-shrink: 0;
    align-items: center;
  }

  .react-select__menu-list {
    border: 1px solid var(--color-grey-700);
    border-top: none;
    border-radius: 0.4rem;
    height: 30vh;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: -webkit-fill-available !important;

    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }

  .react-select__input-container {
    ${(prop) =>
      prop.type === "add-guest" &&
      css`
        display: none;
      `}
  }

  .react-select__option {
    background-color: var(--color-grey-50) !important;
    color: var(--color-grey-900);
    padding: 0rem;
    padding-left: 1rem;
    border-bottom: 1px solid var(--color-grey-400);
  }

  .react-select__indicator {
    padding: 0.4rem;
  }

  .react-select__multi-value {
    background-color: #e5e7eb;
    border-radius: 0.25rem;
    color: #111827;
  }

  .react-select__value-container {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 60px;
    flex: 1;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }

  .react-select__multi-value__remove {
    color: #6b7280;
    &:hover {
      background-color: #d1d5db;
      color: #374151;
    }
  }
`;
