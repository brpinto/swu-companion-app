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

  const [storeVersion, setStoreVersion] = useState(0);

  useEffect(() => {
    const listenerId = store?.addTableListener("cards", () => {
      setStoreVersion((prev) => prev + 1);
    });

    return () => {
      if (listenerId && store) store.delListener(listenerId);
    };
  }, [store]);

  const flipCard = () => {
    if (cardSide === "Avant") setCarSide("Arrière");
    else setCarSide("Avant");
  };

  const findCardInStore = (searchCard: Card | undefined): Row | undefined => {
    if (!searchCard || !store) return undefined;

    if (searchCard.id) {
      const rowIds = store.getRowIds("cards");
      for (const id of rowIds) {
        const row = store.getRow("cards", id);
        if (row?.id === searchCard.id) {
          return row; // Found exact match by ID
        }
      }
    }

    if (searchCard.name) {
      const rowIds = store.getRowIds("cards");
      for (const id of rowIds) {
        const row = store.getRow("cards", id);

        if (
          row?.name === searchCard.name &&
          (row?.number === searchCard.number || row?.set === searchCard.set)
        ) {
          return row;
        }
      }
    }

    return undefined;
  };

  const [cardFromDb, setCardFromDb] = useState<Row | undefined>(undefined);
  const [possessed, setPossessed] = useState<number>(0);
  const [possessedToUpdate, setPossessedToUpdate] = useState<number>(0);

  useEffect(() => {
    if (card) {
      const foundCard = findCardInStore(card);
      setCardFromDb(foundCard);

      const possessedCount =
        foundCard && foundCard.possessed !== undefined
          ? parseInt(String(foundCard.possessed), 10)
          : 0;

      setPossessed(possessedCount);
      setPossessedToUpdate(possessedCount);
    }
  }, [card, store, storeVersion, possessed]);

  const getCardId = (_id: number | undefined): string => {
    if (!_id || !store) return "";

    const rowIds = store.getRowIds("cards");

    for (const id of rowIds) {
      const row = store.getRow("cards", id);
      if (row?.id === _id) {
        return id;
      }
    }

    return "";
  };

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
    findCardInStore,
  };
};
