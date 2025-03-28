import { CardShow } from "@/src/modules/CardShow/CardsShow";
import { useLocalSearchParams } from "expo-router";
import { useCardShowQuery } from "@/src/queries/useCardShowQuery";

export default function CardShowScreen() {
  const { cardId } = useLocalSearchParams();
  const { card } = useCardShowQuery(cardId as string);

  return <CardShow card={card} />;
}
