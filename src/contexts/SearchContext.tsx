import { createContext, useContext, useState } from "react";
import { Card } from "../models/Card";

interface SearchContextInterface {
  searchedCards: Card[] | null;
  setCards: (data: Card[]) => void;
  cardsUpdated: (updated: boolean) => void;
  cardsIndexUpdated: boolean;
}

const searchContextDefaults: SearchContextInterface = {
  searchedCards: null,
  setCards: () => null,
  cardsUpdated: () => null,
  cardsIndexUpdated: false,
};

export const SearchContext = createContext(searchContextDefaults);
export const SearchProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [searchedCards, setSearchedCards] = useState<Card[] | null>(null);
  const [cardsIndexUpdated, setCardsIndexUpdated] = useState<boolean>(false);

  const setCards = async (data: Card[]) => {
    await setSearchedCards(data);
  };

  const cardsUpdated = async (updated: boolean) => {
    await setCardsIndexUpdated(!updated);
  };

  return (
    <SearchContext.Provider
      value={{
        searchedCards,
        setCards,
        cardsIndexUpdated,
        cardsUpdated,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  return useContext(SearchContext);
};
