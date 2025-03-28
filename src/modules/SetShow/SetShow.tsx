import { useLocalSearchParams, useNavigation } from "expo-router";
import { View } from "react-native";
import { Button, XStack, SizableText } from "tamagui";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Card } from "../../models/Card";
import { scale } from "../../components/utils/scale";
import { Ionicons } from "@expo/vector-icons";
import { GridView } from "../../components/GridView";
import styled from "@emotion/native";
import { EdgeInsets } from "react-native-safe-area-context";
import { useCardsQuery } from "../../queries/useCardsQuery";
import * as Device from "expo-device";

export const SetShow = () => {
  const { setCode, setName } = useLocalSearchParams();
  const { cardsIndex, cardsIndexIsLoading } = useCardsQuery();
  const filteredData = cardsIndex?.filter((card: Card) => card.set == setCode);
  const { goBack } = useNavigation();

  const insets = useSafeAreaInsets();

  const VerticalSpacer = ({ factor }: { factor: number }) => {
    return <View style={{ height: scale(8) * factor }} />;
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
          <SizableText size={"$6"}>{setName}</SizableText>
        </XStack>
        <VerticalSpacer factor={1} />
        <GridView
          cards={filteredData!}
          cardsIndexIsLoading={cardsIndexIsLoading}
        />
      </ScreenContainer>
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
