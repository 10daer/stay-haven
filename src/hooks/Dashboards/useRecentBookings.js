import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export default function () {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last") ? 7 : +searchParams.get("last");
  const startDate = subDays(new Date(), numDays).toISOString();

  const { data: recentBookings = [], isLoading: isFetchingBookings } = useQuery(
    {
      queryKey: ["bookings", `last-${numDays}`],
      queryFn: () => getBookingsAfterDate(startDate),
    }
  );

  return { recentBookings, isFetchingBookings };
}
