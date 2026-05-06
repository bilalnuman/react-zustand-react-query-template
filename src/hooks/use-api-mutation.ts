"use client";

import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { toast } from "sonner";
import { useApiStore } from "../store/use-api-store";

interface ApiMutationProps<TData, TVariables> {
  url: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  invalidateKeys?: unknown[][];
  options?: UseMutationOptions<TData, Error, TVariables>;
  errorMessage?: string;
  clearPersistKeys?: string[];
}

export const useApiMutation = <TData, TVariables>({
  url,
  method = "POST",
  invalidateKeys,
  options,
  errorMessage,
  clearPersistKeys,
}: ApiMutationProps<TData, TVariables>) => {
  const queryClient = useQueryClient();
  const { clearData } = useApiStore();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await apiClient({
        url,
        method,
        data: variables,
      });
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      if (invalidateKeys) {
        invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      if (clearPersistKeys) {
        clearPersistKeys.forEach((key) => {
          clearData(key);
        });
      }
      options?.onSuccess?.(data, variables, context, undefined as never);
    },
    onError: (error: Error, variables, context) => {
      console.log(error)
      const apiError = error as any;
      toast.error(errorMessage || apiError?.message || "Something went wrong",{id:"error",closeButton:true});
      options?.onError?.(error, variables, context, undefined as never);
    },
    ...options,
  });
};
