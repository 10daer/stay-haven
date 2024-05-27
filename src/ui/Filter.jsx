import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { devices } from "../styles/MediaQueries";
import GlobalTypes from "../utils/GlobalType";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;

  @media ${devices.md} {
    gap: 0.2rem;
    padding: 0.2rem;
  }
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media ${devices.md} {
    font-size: 1.2rem;
    padding: 0.2rem 0.4rem;
  }
`;

FilterTable.propTypes = GlobalTypes;

function FilterTable({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currFilter =
    filterField === "last"
      ? searchParams.get(filterField) || "7"
      : searchParams.get(filterField) || "all";

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          active={option.value === currFilter}
          disabled={option.value === currFilter}
          key={option.value}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default FilterTable;
