import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createGuestApi, getGuests } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useGuests() {
  const {
    isLoading,
    data: guests = [],
    error,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return { isLoading, guests, error };
}

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createGuest } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      toast.success("New guest added successfully");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { isCreating, createGuest };
}
