import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteBooking, getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function UseBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking = {},
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, booking, error };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBookingFn } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success(`Booking #${data.id} successfully deleted`);
    },
    onError: () => toast.error("Unable to delete booking"),
  });

  return { isDeleting, deleteBookingFn };
}
