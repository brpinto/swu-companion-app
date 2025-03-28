import { Button, getTokens, SizableText, YStack } from "tamagui";
import {
  HorizontalSpacer,
  VerticalSpacer,
} from "../../../components/utils/spacers";
import { Card } from "../../../models/Card";
import { FlatList, View, StyleSheet } from "react-native";
import { Set } from "../../../models/Set";
import { router } from "expo-router";

export const Header = ({ cards }: { cards: Card[] }) => {
  if (cards === undefined) return;

  const setData: Set[] = [
    {
      setCode: "SOR",
      setName: "Étincelle de Rébellion",
      cardsNumber: 252,
    },
    {
      setCode: "SHD",
      setName: "Ombres de la Galaxie",
      cardsNumber: 262,
    },
    {
      setCode: "TWI",
      setName: "Crépuscule de la République",
      cardsNumber: 257,
    },
  ];

  const SetFilterItem = ({ setInfo }: { setInfo: Set }) => {
    return (
      <View style={{ width: "auto", height: "100%", justifyContent: "center" }}>
        <Button
          size={"$5"}
          onPress={() =>
            router.navigate({
              pathname: "/set-stack/set-show",
              params: {
                setCode: setInfo.setCode,
                setName: setInfo.setName,
                setNumber: setInfo.cardsNumber,
              },
            })
          }
          theme={"blue"}
        >
          {setInfo.setName}
        </Button>
      </View>
    );
  };

  const sizeTokens = getTokens().size;

  return (
    <YStack style={{ height: sizeTokens.$10.val }}>
      <View style={{ flexDirection: "row", paddingHorizontal: "1%" }}>
        <SizableText size={"$5"}>{`${cards?.length} cartes`}</SizableText>
        <HorizontalSpacer factor={2} />
        <SizableText size={"$5"}>{`${setData.length} sets`}</SizableText>
      </View>
      <VerticalSpacer factor={1.5} />
      <View style={styles.setLinksContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => {
            return <HorizontalSpacer factor={0.5} />;
          }}
          data={setData}
          renderItem={({ item }) => {
            return <SetFilterItem setInfo={item} />;
          }}
        />
      </View>
    </YStack>
  );
};
const styles = StyleSheet.create({
  setLinksContainer: {
    flexDirection: "column",
  },
});
