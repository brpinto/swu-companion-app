import styled from "@emotion/native";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ids } from "tinybase";
import { useDelTableCallback, useHasTable, useStore } from "tinybase/ui-react";
import { VerticalSpacer } from "@/src/components/utils/spacers";
import { Card } from "@/src/models/Card";
import * as Device from "expo-device";
import { StyleSheet } from "react-native";

const TODO_TABLE = "cards";

import { Dimensions, TouchableOpacity } from "react-native";

const screenHeight = Dimensions.get("window").height;
import { Text } from "tamagui";
import { useFocusEffect } from "expo-router";

export const DecksIndex = () => {
  const store = useStore();
  const cards: Card[] = [];
  const regex = /^\[|\]$/g;
  const [rowIds, setRowIds] = useState<Ids | undefined>([]);

  useFocusEffect(
    useCallback(() => {
      setRowIds(store?.getSortedRowIds(TODO_TABLE));
    }, []),
  );

  rowIds?.map((id) => {
    const row = store?.getRow(TODO_TABLE, id);
    if (row === undefined) return;
    const card: Card = {
      id: parseInt(row?.id as string, 10),
      name: row?.name.toLocaleString() as string,
      subtitle: row?.subtitle.toLocaleString() as string,
      number: row?.number as string,
      aspects: row?.aspects
        ? (row.aspects as string).replace(regex, "").split(",")
        : [],
      types: row?.types
        ? (row.types as string).replace(regex, "").split(",")
        : [],
      cost: parseInt(row?.cost as string, 10),
      set: row?.set as string,
      hp: parseInt(row?.hp as string, 10),
      power: parseInt(row?.power as string, 10),
      arena: row?.arena as string,
      traits: row?.traits
        ? (row.traits as string).replace(regex, "").split(",")
        : [],
      keyword: row?.keywords
        ? (row.keywords as string).replace(regex, "").split(",")
        : [],
      rarity: row?.rarity as string,
      front_art: row?.front_art as string,
      back_art: row?.back_art as string,
      possessed: parseInt(row?.possessed as string, 10),
    };
    cards.push(card);
  });

  const ClearTodos = () => {
    const handlePress = useDelTableCallback(TODO_TABLE);
    return useHasTable(TODO_TABLE) ? (
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.clearTodos}>Clear all</Text>
      </TouchableOpacity>
    ) : null;
  };

  return (
    <SafeContainer>
      <ScreenContainer>
        <VerticalSpacer factor={2} />
        <ClearTodos />
        <Text theme="blue" fontSize={"$8"} fontWeight="bold">
          Vos decks
        </Text>
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
  paddingBottom: Device.osName === "iOS" ? 0 : screenHeight * 0.22,
}));

const styles = StyleSheet.create({
  clearTodos: {
    margin: 16,
    flex: 0,
    textAlign: "center",
    fontSize: 16,
  },
});
