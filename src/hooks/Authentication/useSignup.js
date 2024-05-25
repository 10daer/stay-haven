import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signupAuth } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading: isAuthenticating } = useMutation({
    mutationFn: signupAuth,
    onSuccess: () => {
      toast.success(
        `User successfully created. Verification mail sent to user/'s email`
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isAuthenticating };
}
