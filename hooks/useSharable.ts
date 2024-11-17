import { useQuery } from "@tanstack/react-query";

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
  const response = await fetch(`/api/getSharedEntity?id=${sharableId}`);
  const data = await response.json();

  if (!data)
    console.error("Sharable not found");
  else
    return data;
};
