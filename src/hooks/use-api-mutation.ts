"use client";

import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/services/api-client";
import { toast } from "sonner";
import { useApiStore } from "../store/use-api-store";
import { useTranslations } from "next-intl";

interface ApiMutationProps<TData, TVariables> {
  url: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  invalidateKeys?: unknown[][];
  options?: UseMutationOptions<TData, Error, TVariables>;
  errorMessage?: string;
  successMessage?: string;
  clearPersistKeys?: string[];
}

export const useApiMutation = <TData, TVariables>({
  url,
  method = "POST",
  invalidateKeys,
  options,
  errorMessage,
  successMessage,
  clearPersistKeys,
}: ApiMutationProps<TData, TVariables>) => {
  const queryClient = useQueryClient();
  const { clearData } = useApiStore();
  const tError = useTranslations("BackendMessages");
  const tSuccess = useTranslations("SuccessMessages");

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await apiClient({
        url,
        method,
        data: variables,
      });
      return response.data;
    },
    onSuccess: (data: any, variables, context) => {
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

      // Handle localized success message
      const successCode = successMessage || data?.code;
      if (successCode && tSuccess.has(successCode as any)) {
        toast.success(tSuccess(successCode as any), { id: "api-success" });
      } else if (data?.message) {
        toast.success(data.message, { id: "api-success" });
      }

      options?.onSuccess?.(data, variables, context, undefined as never);
    },
    onError: (error: Error, variables, context) => {
      const apiError = error as any;
      console.log(apiError)
      const errorCode = apiError?.response?.data?.code || "unknown_error";
      
      const message = errorMessage || 
        (tError.has(errorCode) ? tError(errorCode) : (apiError?.response?.data?.detail || apiError?.message || tError("unknown_error")));

      toast.error(message, { id: "api-error", closeButton: true });
      options?.onError?.(error, variables, context, undefined as never);
    },
    ...options,
  });
};
