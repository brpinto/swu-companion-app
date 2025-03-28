import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

import { AxiosContext } from "../contexts/AxiosContext";
import { Card } from "../models/Card";
import { SearchContext } from "../contexts/SearchContext";
import { router } from "expo-router";

type SearchCardsDto = {
  name?: string;
  aspects?: {
    aspectsValue: string[];
    aspectsMethod: string;
  };
  types?: string[];
  rarity?: string[];
  set?: string[];
  arena?: string[];
  traits?: {
    traitsValue: string[];
    traitsMethod: string;
  };
  keywords?: string[];
  cost?: number | null;
  hp?: number | null;
  power?: number | null;
};

export const useSearchCardsMutation = () => {
  const { publicAxios } = useContext(AxiosContext);
  const { setCards } = useContext(SearchContext);
  const searchCardsApiCall = async (searchCardsDto: SearchCardsDto) => {
    const response = await publicAxios.post("/cards/search", searchCardsDto);
    return response.data;
  };

  const searchMutation = useMutation({
    mutationFn: searchCardsApiCall,
    onSuccess: async (data: Card[]) => {
      await setCards(data);
      router.push({
        pathname: "/search-results",
      });
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });

  return {
    searchMutation,
  };
};
