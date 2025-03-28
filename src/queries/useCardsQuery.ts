import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AxiosContext } from "../contexts/AxiosContext";
import { queryKeys } from "../queries/queryKeys";
import { Card } from "../models/Card";

export const useCardsQuery = () => {
  const { publicAxios } = useContext(AxiosContext);

  const cardsListApiCall = async (): Promise<Card[]> => {
    const { data } = await publicAxios.get<Card[]>(`/cards`);

    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.cardsList(),
    queryFn: async () => {
      const data = await cardsListApiCall();
      return data;
    },
  });

  return {
    cardsIndex: data,
    cardsIndexIsLoading: isLoading,
    refetchCardIndex: refetch,
  };
};
