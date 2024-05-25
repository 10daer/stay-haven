import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUserData } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserData,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("User's data successfully Updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
