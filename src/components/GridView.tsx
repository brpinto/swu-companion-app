import { Card } from "../models/Card";
import { Dimensions, Pressable, Image, View } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Spinner, YStack, Text } from "tamagui";
import { router } from "expo-router";
import { useStore } from "tinybase/ui-react";
import { Row } from "tinybase/store";

export const GridView = ({
  cards,
  cardsIndexIsLoading,
}: {
  cards: Card[];
  cardsIndexIsLoading: boolean;
}) => {
  const winWidth = Dimensions.get("screen").width;
  const store = useStore();

  const renderItem: ListRenderItem<Card> = ({ item }) => {
    const getCardByName = (name: string): Row | undefined => {
      const table = store?.getTable("cards");

      const res = Object.values(table ?? {});
      const _card: Row[] = res.filter((el) => {
        return el.name === name;
      });
      return _card[0];
    };

    const cardFromDb = getCardByName(item?.name ?? "");
    let possessed: number | undefined = 0;
    if (cardFromDb)
      possessed =
        cardFromDb && cardFromDb?.possessed !== undefined
          ? parseInt(cardFromDb?.possessed.valueOf().toString(), 10)
          : 0;

    return (
      <Pressable
        onPress={async () => {
          router.navigate({
            pathname: "/set-stack/card-show",
            params: {
              cardId: item?.id,
            },
          });
        }}
        style={{
          width: (winWidth - winWidth * 0.1) / 3 - winWidth * 0.03,
          height: 200,
          justifyContent: "center",
          paddingHorizontal: "2%",
          position: "relative",
        }}
      >
        <Image
          src={item.front_art}
          style={{
            aspectRatio: ["Leader", "Leader unité", "Base"].some((el) =>
              item.types?.includes(el),
            )
              ? 1 / 1.2
              : 1 / 1.7,
            transform: [
              {
                rotate: ["Leader", "Leader unité", "Base"].some((el) =>
                  item.types?.includes(el),
                )
                  ? "-90deg"
                  : "0deg",
              },
            ],
            height: "95%",
            width: "90%",
            resizeMode: "contain",
            position: "relative",
            left: ["Leader", "Leader unité", "Base"].some((el) =>
              item.types?.includes(el),
            )
              ? -25
              : 0,
          }}
        />
        {possessed && possessed > 0 ? (
          <View
            style={{
              position: "absolute",
              top: 20,
              right: 0,
              backgroundColor: "black",
              borderWidth: 2,
              borderColor: "white",
              height: 30,
              justifyContent: "center",
              paddingHorizontal: "6%",
              paddingTop: "4%",
              borderTopColor: "black",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                paddingBottom: 20,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {possessed}
            </Text>
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      {cardsIndexIsLoading ? (
        <YStack
          style={{ height: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="large" color="$blue10" />
        </YStack>
      ) : (
        <FlashList
          showsVerticalScrollIndicator={false}
          data={cards}
          renderItem={renderItem}
          estimatedItemSize={200}
          numColumns={3}
        />
      )}
    </View>
  );
};
