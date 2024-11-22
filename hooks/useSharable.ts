import { useQuery } from "@tanstack/react-query";
import getVercelUrl from "../utils/urls";

export interface Sharable<T> {
  sharableFields: string[];
  authorName: string;
  target: T;
}

export const useSharable = <T>(sharableId: string) => {

  const { data: sharedEntity, error, isLoading, refetch, isFetching } =
    useQuery({
      queryKey: ["sharable", sharableId],
      queryFn: () => fetchSharable<T>(sharableId),
      staleTime: 1000 * 60 * 5,
    })

  return {
    sharedEntity,
    error,
    isLoading,
    refetch,
    isFetching,
  };
};

export const fetchSharable = async <T>(sharableId: string) => {
  const response = await fetch(
    `${getVercelUrl()}/api/getSharedEntity?id=${sharableId}`
  );

  return await response.json() as Sharable<T>;
};
