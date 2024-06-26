import styled from "styled-components";
import { Link } from "react-router-dom";

import CheckoutButton from "./CheckoutButton";

import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import GlobalTypes from "../../utils/GlobalType";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 7rem 1.4rem 1fr 6rem 9rem;
  gap: 0.8rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

TodayItem.propTypes = GlobalTypes;

function TodayItem({ activity }) {
  const { id, guests, numNights, status } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.nationality}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          size="dash"
          variation="primary"
          as={Link}
          to={`/check-in/${id}`}
        >
          Check-in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
