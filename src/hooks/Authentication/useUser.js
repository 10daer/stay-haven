import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading: isPending, data: user = {} } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return {
    isPending,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
