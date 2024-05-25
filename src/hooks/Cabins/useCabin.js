import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createEditCabin,
  deleteCabin,
  getCabins,
} from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully Updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("New cabin added successfully");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { isCreating, createCabin };
}

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabinFn } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabinFn };
}

export function UseCabins() {
  const {
    isLoading,
    data: cabins = [],
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
