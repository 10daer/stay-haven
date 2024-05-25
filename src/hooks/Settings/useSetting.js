import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function UseSetting() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}

export function UseUpdateSettingValue() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSettingFn } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings successfully updated");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSettingFn };
}
