import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { scale } from "../../components/utils/scale";
import { GridView } from "../../components/GridView";
import styled from "@emotion/native";
import { SearchContext } from "../../contexts/SearchContext";
import { HeaderNav } from "@/src/components/navigation/Header";
import { SizableText, Text, XStack } from "tamagui";
import * as Device from "expo-device";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const SearchResult = () => {
  const { searchedCards } = useContext(SearchContext);
  const VerticalSpacer = ({ factor }: { factor: number }) => {
    return <View style={{ height: scale(8) * factor }} />;
  };

  return (
    <SafeContainer edges={["left", "right", "bottom"]}>
      <ScreenContainer>
        <HeaderNav />
        <VerticalSpacer factor={2} />
        <Text theme="blue" fontSize={"$8"} fontWeight="bold">
          Résultat de la recherche
        </Text>
        <VerticalSpacer factor={2} />
        {searchedCards && searchedCards?.length > 0 ? (
          <View style={{ backgroundColor: "white" }}>
            <GridView cardsIndexIsLoading={false} cards={searchedCards ?? []} />
          </View>
        ) : (
          <XStack justifyContent="center">
            <SizableText size={"$7"}>Aucune carte n'a été trouvée.</SizableText>
          </XStack>
        )}
      </ScreenContainer>
    </SafeContainer>
  );
};

const SafeContainer = styled(SafeAreaView)(() => ({
  flex: 1,
  backgroundColor: "white",
}));

const ScreenContainer = styled(SafeAreaView)(({ theme }) => ({
  paddingHorizontal: theme.unit * 2,
  paddingBottom:
    Device.osName === "iOS" ? screenHeight * 0.17 : screenHeight * 0.25,
}));
