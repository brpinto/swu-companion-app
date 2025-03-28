import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";
import { queryKeys } from "../queries/queryKeys";
import { Card } from "../models/Card";

export const useCardShowQuery = (cardId: string) => {
  const { publicAxios } = useContext(AxiosContext);

  const cardShowApiCall = async (): Promise<Card> => {
    const { data } = await publicAxios.get<Card>(`/cards/${cardId}`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.cardShow(cardId),
    queryFn: async () => {
      const data = await cardShowApiCall();
      return data;
    },
  });

  return {
    card: data,
    cardIsLoading: isLoading,
  };
};
