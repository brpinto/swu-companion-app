import { Card } from "@/src/models/Card";
import { openDatabase } from "@/src/utils/db";
import { useEffect, useState } from "react";
import { useStore } from "tinybase/ui-react";
import { Row } from "tinybase/store";

export const useCardShow = (card: Card | undefined) => {
  const [cardSide, setCarSide] = useState<"Avant" | "Arrière">("Arrière");
  const [cardUptateModalVisible, setCardUpdateModalVisible] =
    useState<boolean>(false);
  const db = openDatabase();
  const store = useStore();

  const flipCard = () => {
    if (cardSide === "Avant") setCarSide("Arrière");
    else setCarSide("Avant");
  };

  const getCardByName = (name: string): Row | undefined => {
    const table = store?.getTable("cards");

    const res = Object.values(table ?? {});
    const _card: Row[] = res.filter((el) => {
      return el.name === name;
    });
    return _card[0];
  };

  const cardFromDb = getCardByName(card?.name ?? "");
  const possessed: number = cardFromDb
    ? parseInt(cardFromDb?.possessed.toString(), 10)
    : 0;
  const [possessedToUpdate, setPossessedToUpdate] = useState<number>(possessed);

  useEffect(() => {
    setPossessedToUpdate(possessed);
  }, [possessed]);

  const getCardId = (_id: number | undefined): string => {
    const rowIds = store?.getSortedRowIds("cards");

    let cardId = "";

    rowIds?.forEach((id) => {
      const row = store?.getRow("cards", id);
      if (row?.id === _id) {
        cardId = id;
      }
    });
    return cardId;
  };

  if (card !== undefined) {
    getCardByName(card?.name);
  }

  return {
    cardSide,
    setCarSide,
    flipCard,
    db,
    cardFromDb,
    possessedToUpdate,
    setPossessedToUpdate,
    cardUptateModalVisible,
    setCardUpdateModalVisible,
    getCardId,
  };
};
