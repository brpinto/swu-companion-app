import styled from "@emotion/native";
import { Card } from "../../models/Card";
import { useContext, useState, useEffect } from "react";
import { Image, Modal, View } from "react-native";
import { Button, getTokens, SizableText, XStack, YStack } from "tamagui";
import { useCardShow } from "./useCardShow";
import {
  EdgeInsets,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as Device from "expo-device";
import { Ionicons } from "@expo/vector-icons";
import { VerticalSpacer } from "@/src/components/utils/spacers";
import { useNavigation } from "expo-router";
import { useTheme } from "@emotion/react";
import { useStore } from "tinybase/ui-react";
import { Row } from "tinybase/store";
import { SearchContext } from "@/src/contexts/SearchContext";

interface CardDetailsProps {
  card: Card | undefined;
}

export const CardShow = (props: CardDetailsProps) => {
  const { card } = props;
  const {
    cardSide,
    flipCard,
    possessedToUpdate,
    getCardId,
    cardUptateModalVisible,
    setPossessedToUpdate,
    setCardUpdateModalVisible,
    cardFromDb,
  } = useCardShow(card);
  const { cardsUpdated, cardsIndexUpdated } = useContext(SearchContext);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const goBack = () => {
    cardsUpdated(!cardsIndexUpdated);
    navigation.goBack();
  };
  const theme = useTheme();
  const colorTokens = getTokens().color;
  const store = useStore();
  const [frontImage, setFrontImage] = useState<string>("");
  const [backImage, setBackImage] = useState<string>("");

  const [storeVersion, setStoreVersion] = useState(0);

  useEffect(() => {
    const listenerId = store?.addTableListener("cards", () => {
      setStoreVersion((prev) => prev + 1);
    });

    return () => {
      if (listenerId && store) store.delListener(listenerId);
    };
  }, [store, storeVersion]);

  const setBase64Image = (
    imageUrl: string,
    stateFunc: (image: string) => void,
  ) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          stateFunc(base64data as string);
        };
      });
  };

  if (card !== undefined) {
    setBase64Image(card?.front_art, setFrontImage);
    setBase64Image(card?.back_art, setBackImage);
  }

  const addCard = () => {
    if (card === undefined) return;

    const _card: Row = {
      id: card?.id,
      name: card?.name,
      subtitle: card?.subtitle,
      number: card?.number,
      aspects: `[${card?.aspects}]`,
      types: `[${card?.types}]`,
      cost: card?.cost,
      set: card?.set,
      hp: card?.hp,
      power: card?.power,
      arena: card?.arena,
      traits: `[${card?.traits}]`,
      keyword: `[${card?.keyword}]`,
      rarity: card?.rarity,
      front_art: frontImage,
      back_art: backImage,
      possessed: possessedToUpdate as number,
    };

    store?.addRow("cards", _card, false);
    setPossessedToUpdate(possessedToUpdate);
    cardsUpdated(!cardsIndexUpdated);
    setCardUpdateModalVisible(false);
  };

  const deleteCard = (rowId: string) => {
    store?.delRow("cards", rowId);
    cardsUpdated(!cardsIndexUpdated);
    setCardUpdateModalVisible(false);
  };

  const updateCard = () => {
    if (card === undefined) return;
    const id = getCardId(card?.id);

    if (possessedToUpdate === 0) {
      deleteCard(id);
      return;
    }

    if (!id) {
      console.warn("Card not found in store, adding instead of updating");
      addCard();
      return;
    }

    store?.setPartialRow("cards", id, {
      possessed: possessedToUpdate,
    });

    setPossessedToUpdate(possessedToUpdate);

    cardsUpdated(!cardsIndexUpdated);
    setCardUpdateModalVisible(false);
  };

  return (
    <SafeContainer edges={["left", "right", "bottom"]}>
      <ScreenContainer insets={insets}>
        <XStack $sm={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Button
            icon={<Ionicons name="chevron-back" size={35} />}
            unstyled
            onPress={goBack}
          />
        </XStack>
        <VerticalSpacer factor={1} />
        <YStack height={"100%"} alignItems="center">
          {card?.types &&
          (card.types[0] === "Base" ||
            card.types[0] === "Unité" ||
            card.types[0] === "Amélioration" ||
            card.types[0] === "Évènement" ||
            card.types[0] === "Jeton Unité") ? (
            <View
              style={{
                height: "80%",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
              }}
            >
              <Image
                src={cardSide === "Arrière" ? card?.front_art : card?.back_art}
                style={{
                  height: card.types[0] === "Base" ? "75%" : "65%",
                  width: card.types[0] === "Base" ? "110%" : "100%",
                  transform: [
                    { rotate: card.types[0] === "Base" ? "-90deg" : "0deg" },
                  ],
                }}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View
              style={{
                height: "80%",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
              }}
            >
              <Image
                src={cardSide === "Arrière" ? card?.front_art : card?.back_art}
                style={{
                  height: cardSide === "Arrière" ? "75%" : "65%",
                  width: cardSide === "Arrière" ? "110%" : "100%",
                  transform: [
                    { rotate: cardSide === "Arrière" ? "-90deg" : "0deg" },
                  ],
                }}
                resizeMode="contain"
              />
              <View style={{ position: "absolute", bottom: "5%" }}>
                <Button theme="blue" onPress={flipCard}>
                  {cardSide}
                </Button>
              </View>
            </View>
          )}
          <Button theme="blue" onPress={() => setCardUpdateModalVisible(true)}>
            {cardFromDb !== undefined
              ? `Possédée x ${cardFromDb?.possessed}`
              : "Ajouter à ma collection"}
          </Button>
        </YStack>
      </ScreenContainer>
      <Modal visible={cardUptateModalVisible} transparent={true}>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              flex: 0.3,
              backgroundColor: "white",
              borderTopWidth: 1,
              borderTopColor: colorTokens.$gray5Light.val,
              paddingHorizontal: theme.unit * 2,
              paddingTop: theme.unit * 2,
            }}
          >
            <XStack justifyContent="flex-end">
              <Button
                icon={
                  <Ionicons
                    name="close"
                    size={35}
                    color={colorTokens.$blue7Dark.val}
                  />
                }
                unstyled
                onPress={() => setCardUpdateModalVisible(false)}
              />
            </XStack>
            <VerticalSpacer factor={3} />
            <YStack alignItems="center">
              <XStack alignItems="center" gap={10}>
                <Button
                  theme="blue"
                  onPress={() => possessedToUpdate > 0 ? setPossessedToUpdate(possessedToUpdate - 1) : null}
                >
                  -
                </Button>
                <SizableText>Standard x {possessedToUpdate}</SizableText>
                <Button
                  theme="blue"
                  onPress={() => setPossessedToUpdate(possessedToUpdate + 1)}
                >
                  +
                </Button>
              </XStack>
              <VerticalSpacer factor={2} />
              <Button
                theme="blue"
                onPress={() => {
                  if (cardFromDb) {
                    updateCard();
                  } else {
                    addCard();
                  }
                }}
              >
                Valider
              </Button>
            </YStack>
          </View>
        </View>
      </Modal>
    </SafeContainer>
  );
};

const SafeContainer = styled(SafeAreaView)(() => ({
  flex: 1,
  backgroundColor: "white",
}));

const ScreenContainer = styled(SafeAreaView)<{ insets: EdgeInsets }>(
  ({ theme, insets }) => ({
    backgroundColor: "white",
    paddingHorizontal: theme.unit * 2,
    paddingBottom: Device.osName === "iOS" ? insets.bottom : theme.unit * 10,
  }),
);
