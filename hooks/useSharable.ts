import { useQuery } from "@tanstack/react-query";
import getVercelUrl from "../urls";

export const useSharable = (sharableId: string) => {

  const { data: sharedEntity, error, isLoading, refetch, isFetching } =
    useQuery({
      queryKey: ["sharable", sharableId],
      queryFn: () => fetchSharable(sharableId),
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

export const fetchSharable = async (sharableId: string) => {
  const response = await fetch(
    `${getVercelUrl()}/api/getSharedEntity?id=${sharableId}`
  );

  return await response.json();
};
