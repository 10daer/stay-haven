import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { DOC_PER_PAGE } from "../utils/constants";
import GlobalTypes from "../utils/GlobalType";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

Pagination.propTypes = GlobalTypes;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currPage = +searchParams.get("page") || 1;
  const pageCount = Math.ceil(count / DOC_PER_PAGE);

  function next() {
    const page =
      currPage === pageCount || currPage > pageCount ? pageCount : currPage + 1;

    searchParams.set("page", page);
    setSearchParams(searchParams);
  }
  function prev() {
    const page = currPage <= 1 ? 1 : currPage - 1;

    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  if (count === DOC_PER_PAGE || count < DOC_PER_PAGE) return null;

  return (
    <StyledPagination>
      <Paragraph>
        Showing <span>{(currPage - 1) * DOC_PER_PAGE + 1}</span> to{" "}
        <span>
          {currPage === pageCount || currPage > pageCount
            ? count
            : currPage * DOC_PER_PAGE}
        </span>{" "}
        of <span>{count}</span> results
      </Paragraph>

      <Buttons>
        <PaginationButton onClick={prev} disabled={currPage === 1}>
          <HiChevronLeft /> Prev
        </PaginationButton>
        <PaginationButton onClick={next} disabled={currPage === pageCount}>
          Next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
