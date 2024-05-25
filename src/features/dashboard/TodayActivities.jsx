import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useActivities from "../../hooks/Dashboards/useActivities";
import TodayItem from "./TodayItem";
import Spinner from "../../ui/Spinner";
import { devices } from "../../styles/MediaQueries";
import useStopLoading from "../../hooks/useStopLoading";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  justify-content: space-between;

  @media ${devices.sm} {
    grid-column: 1 /-1;
  }

  /* @media ${devices.md} {
    grid-column: 1fr;
  } */
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const NoActivityScreen = () => (
  <NoActivity>No activity reported today</NoActivity>
);

function TodayActivities() {
  const { todayActivities, isFetchingActivities } = useActivities();
  const loading = useStopLoading(isFetchingActivities);

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Table&apos;s Activity</Heading>
      </Row>

      {loading ? (
        <Spinner type="dashboard" />
      ) : (
        <Activities todayActivities={todayActivities} />
      )}
      <Button as={Link} to="/create-booking">
        Create Booking
      </Button>
    </StyledToday>
  );
}

function Activities({ todayActivities }) {
  return (
    <>
      {!todayActivities.length ? (
        <NoActivityScreen />
      ) : (
        <TodayList>
          {todayActivities.map((activity) => (
            <TodayItem activity={activity} key={activity.id} />
          ))}
        </TodayList>
      )}
    </>
  );
}

export default TodayActivities;
