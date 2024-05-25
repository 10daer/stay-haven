import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

import Stat from "./Stat";

function Stats({
  bookings,
  numDays,
  cabinsCount,
  stays,
  isFetchingBooks,
  isFetchingStays,
  isLoading,
}) {
  const sales = stays.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const bookingLength = bookings.length;
  const staysLength = stays.length;
  const occupancyRate =
    +stays.reduce((acc, curr) => acc + curr.numNights, 0) /
      (+cabinsCount * +numDays) || 0;

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={bookingLength}
        color="blue"
        loading={isFetchingBooks}
      />
      <Stat
        icon={<HiOutlineCalendar />}
        title="Check ins"
        value={staysLength}
        color="indigo"
        loading={isFetchingStays}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        loading={isFetchingStays}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rates"
        value={`${Math.round(occupancyRate * 100)}%`}
        color="yellow"
        loading={isFetchingStays || isLoading}
      />
    </>
  );
}

export default Stats;
