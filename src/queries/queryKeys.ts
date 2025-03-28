import { QueryKey } from "@tanstack/react-query";

const API_URL = process.env.API_URL;

type queryFunction<T> = (arg: T) => QueryKey;
type queryKeysType = {
  cardsList: queryFunction<void>;
  cardsSearch: queryFunction<void>;
  cardShow: queryFunction<string | null>;
};

export const queryKeys: queryKeysType = {
  cardsList: () => [API_URL, "cards"],
  cardsSearch: () => [API_URL, "search"],
  cardShow: (cardId) => [API_URL, "show", cardId],
};
