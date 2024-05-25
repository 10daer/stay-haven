import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export default function () {
  const { data: todayActivities = [], isLoading: isFetchingActivities } =
    useQuery({
      queryKey: ["today's-activity"],
      queryFn: getStaysTodayActivity,
    });

  return { todayActivities, isFetchingActivities };
}
