import styled from "@emotion/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GridView } from "../../components/GridView";
import { VerticalSpacer } from "../../components/utils/spacers";
import { Header } from "./components/header";
import { useCardsQuery } from "../../queries/useCardsQuery";
import { Text } from "tamagui";
import * as Device from "expo-device";
import { Dimensions } from "react-native";
import { useSearchContext } from "../../contexts/SearchContext";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";

const screenHeight = Dimensions.get("window").height;

export const CardsIndex = () => {
  const { cardsIndex, cardsIndexIsLoading, refetchCardIndex } = useCardsQuery();
  const { cardsIndexUpdated } = useSearchContext();
  const navigation = useNavigation();
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    refetchCardIndex();
  }, [cardsIndexUpdated, refetchCardIndex]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setHasFocus(true);
      refetchCardIndex();
    });

    const blurUnsubscribe = navigation.addListener("blur", () => {
      setHasFocus(false);
    });

    return () => {
      unsubscribe();
      blurUnsubscribe();
    };
  }, [navigation, refetchCardIndex, hasFocus]);

  return (
    <SafeContainer edges={["left", "right"]}>
      <ScreenContainer>
        <Header cards={cardsIndex!} />
        <VerticalSpacer factor={3} />
        <Text theme="blue" fontSize={"$8"} fontWeight="bold">
          Toutes les cartes
        </Text>
        <VerticalSpacer factor={2} />
        <GridView
          cards={cardsIndex!}
          cardsIndexIsLoading={cardsIndexIsLoading}
        />
      </ScreenContainer>
    </SafeContainer>
  );
};

const SafeContainer = styled(SafeAreaView)(() => ({
  flex: 1,
  backgroundColor: "white",
  height: "100%",
}));

const ScreenContainer = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  height: "100%",
  paddingHorizontal: theme.unit * 2,
  paddingBottom:
    Device.osName === "iOS" ? screenHeight * 0.15 : screenHeight * 0.22,
}));
