import { createContext, useContext } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledTable = styled.table`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`;

const CommonRow = styled.tr`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: ${(props) => (props.type === "cabins" ? "2.4rem" : "0.8rem")};
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.4rem 2.4rem;
  justify-items: center;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-300);
  }
`;

const StyledBody = styled.tbody`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  max-height: 32rem;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--color-brand-100);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-500);
    border-radius: 4px;
    cursor: pointer;
  }
`;

const StyledFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 13.6rem;
`;

const StyledHeaderCell = styled.th`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  & div {
    background-color: var(--color-grey-100);
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
`;

const StyledSort = styled.div`
  cursor: pointer;
  border-radius: 3px solid #fff;

  & svg {
    ${(props) =>
      props.active &&
      css`
        background-color: var(--color-grey-300);
      `}
    color: var(--color-grey-900);
    font-weight: 900;
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
  }

  & svg:hover {
    background-color: var(--color-grey-200);
  }
`;

const TableContext = createContext();

function Table({ children, columns, type }) {
  return (
    <TableContext.Provider value={{ columns, type }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { type, columns } = useContext(TableContext);
  return (
    <StyledHeader type={type} columns={columns}>
      {children}
    </StyledHeader>
  );
}
function Body({ render, data }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}
function Footer({ children }) {
  return <StyledFooter>{children}</StyledFooter>;
}
function Row({ children }) {
  const { columns, type } = useContext(TableContext);
  return (
    <StyledRow columns={columns} type={type}>
      {children}
    </StyledRow>
  );
}
function HeaderCell({ header, sort, field }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeValue = searchParams.get(field) || "name-asc";
  const active = (val) =>
    activeValue.split("-").at(1) === val &&
    activeValue.split("-").at(0) === sort;

  function handleClick(value) {
    searchParams.set(field, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledHeaderCell>
      {header}
      <div>
        <StyledSort
          active={active("asc")}
          onClick={() => handleClick(`${sort}-asc`)}
        >
          <CgChevronUp />
        </StyledSort>
        <StyledSort
          active={active("desc")}
          onClick={() => handleClick(`${sort}-desc`)}
        >
          <CgChevronDown />
        </StyledSort>
      </div>
    </StyledHeaderCell>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;
Table.HeaderCell = HeaderCell;

export default Table;
