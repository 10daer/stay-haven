import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createBookingApi, getBookings } from "../../services/apiBookings";
import { DOC_PER_PAGE } from "../../utils/constants";
import toast from "react-hot-toast";

export function UseBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = +searchParams.get("page") || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => getBookings({ page }),
  });

  const pageCount = Math.ceil(count / DOC_PER_PAGE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", page + 1],
      queryFn: () => getBookings({ page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", page - 1],
      queryFn: () => getBookings({ page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCreating, mutate: createBooking } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/bookings");
      toast.success(`New booking successfully created`);
    },
    onError: () => toast.error("There was an error while creating new booking"),
  });

  return { isCreating, createBooking };
}
