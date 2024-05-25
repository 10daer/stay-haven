import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function () {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} successfully checked out`);
    },
    onError: () => toast.error("There was an error while checking out"),
  });

  return { isCheckingOut, checkOut };
}
