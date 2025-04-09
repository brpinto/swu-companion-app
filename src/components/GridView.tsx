import { Card } from "../models/Card";
import { Dimensions, Pressable, Image, View } from "react-native";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Spinner, YStack, Text } from "tamagui";
import { router } from "expo-router";
import { useStore } from "tinybase/ui-react";
import { useState, useEffect, useMemo } from "react";

export const GridView = ({
  cards,
  cardsIndexIsLoading,
}: {
  cards: Card[];
  cardsIndexIsLoading: boolean;
}) => {
  const winWidth = Dimensions.get("screen").width;
  const store = useStore();
  const [forceUpdate, setForceUpdate] = useState(0);

  // Listen for changes to the cards table and force a re-render
  useEffect(() => {
    // Create a listener for TinyBase store changes that forces a re-render
    const listenerId = store?.addTableListener("cards", () => {
      setForceUpdate((prev) => prev + 1);

      // Add a short timeout to ensure the update has time to propagate
      setTimeout(() => {
        setForceUpdate((prev) => prev + 1);
      }, 100);
    });

    // Clean up listener when component unmounts
    return () => {
      if (listenerId && store) store.delListener(listenerId);
    };
  }, [store]);

  // Refresh component when cards prop changes
  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [cards]);

  // Create a map of card names to their possession counts
  // This is more efficient than looking up each card individually in renderItem
  const possessionMap = useMemo(() => {
    const map = new Map<string, number>();

    if (store) {
      const rowIds = store.getRowIds("cards");
      for (const id of rowIds) {
        const row = store.getRow("cards", id);
        if (row && row.name) {
          const possessed =
            row.possessed !== undefined
              ? parseInt(String(row.possessed), 10)
              : 0;
          map.set(String(row.name), possessed);
        }
      }
    }

    return map;
  }, [store, forceUpdate]); // Recalculate when store changes or forceUpdate changes

  const renderItem: ListRenderItem<Card> = ({ item }) => {
    // Get possession count from our pre-calculated map
    const possessed = item?.name ? possessionMap.get(item.name) || 0 : 0;

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
          key={`card-list-${forceUpdate}`}
          showsVerticalScrollIndicator={false}
          data={cards}
          renderItem={renderItem}
          estimatedItemSize={200}
          numColumns={3}
          extraData={forceUpdate}
        />
      )}
    </View>
  );
};
