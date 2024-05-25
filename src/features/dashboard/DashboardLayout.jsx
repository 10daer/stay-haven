import styled from "styled-components";
import useStays from "../../hooks/Dashboards/useStays";
import useRecentBookings from "../../hooks/Dashboards/useRecentBookings";
import { UseCabins } from "../../hooks/Cabins/useCabin";

import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivities from "./TodayActivities";
import { devices } from "../../styles/MediaQueries";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: auto 34rem auto;
  gap: 2rem;
  height: 72.4vh;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* @media ${devices.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media ${devices.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.6rem;
  } */

  /* @media ${devices.md} {
    grid-template-columns: 9rem 1fr;
  } */
`;

function DashboardLayout() {
  const { stays, isFetchingStays, numDays } = useStays();
  const { recentBookings, isFetchingBookings } = useRecentBookings();
  const { cabins, isLoading } = UseCabins();

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        stays={stays}
        isFetchingBooks={isFetchingBookings}
        isFetchingStays={isFetchingStays}
        isLoading={isLoading}
        cabinsCount={cabins.length}
        numDays={numDays}
      />
      <TodayActivities />
      <DurationChart sales={stays} isFetching={isFetchingStays} />
      <SalesChart
        sales={stays}
        numDays={numDays}
        isFetching={isFetchingStays}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
