import styled from "@emotion/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GridView } from "../../components/GridView";
import { VerticalSpacer } from "../../components/utils/spacers";
import { Header } from "./components/header";
import { useCardsQuery } from "../../queries/useCardsQuery";
import { Text } from "tamagui";
import * as Device from "expo-device";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const CardsIndex = () => {
  const { cardsIndex, cardsIndexIsLoading } = useCardsQuery();

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
