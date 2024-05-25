import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import { loginAuth } from "../../services/apiAuth";
import { useGlobalContext } from "../../context/useGlobalContext";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { redirectUrl } = useGlobalContext();

  const { mutate: login, isLoading: isAuthenticating } = useMutation({
    mutationFn: ({ email, password }) => loginAuth({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate(redirectUrl || "/dashboard");
      toast.success(`Welcome back, ${user?.user_metadata.fullName || ""}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isAuthenticating };
}
