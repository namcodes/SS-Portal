import { useMutation, useQuery, useQueryClient } from "react-query";
import type { AxiosResponse } from "axios";

interface UseReactQueryMutateParams<T> {
  mutationFn: (params: T) => Promise<AxiosResponse<any, any>>;
  queryKey?: unknown[];
}

interface UseReactQueryGetParams<T> {
  queryFn: (params?: T) => Promise<AxiosResponse<any, any>>;
  queryKey: unknown[];
  params?: T;
  refetchOnWindowFocus?: boolean;
}

const useReactQueryMutate = <T>({
  mutationFn,
  queryKey,
}: UseReactQueryMutateParams<T>) => {
  const queryClient = useQueryClient();

  const ret = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey, {
        refetchActive: true,
        refetchInactive: false,
      });
    },
  });

  return { ...ret };
};

const useReactQueryGet = <T>({
  queryFn,
  queryKey,
  params,
  refetchOnWindowFocus = false,
}: UseReactQueryGetParams<T>) => {
  const ret = useQuery({
    queryKey: queryKey,
    queryFn: () => queryFn(params),
    refetchOnWindowFocus: refetchOnWindowFocus,
  });

  return { ...ret };
};

export { useReactQueryGet, useReactQueryMutate };
