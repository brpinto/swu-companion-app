import { Tabs } from "expo-router";

import { TabBarIcon } from "../../src/components/navigation/TabBarIcon";
import { getTokens } from "tamagui";

export default function TabLayout() {
  const colorTokens = getTokens().color;
  const blue = colorTokens.$blue7Dark.val;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: blue,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Cartes",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "grid" : "grid-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="decks"
        options={{
          title: "Decks",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "layers" : "layers-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Recherche",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "magnet" : "magnet-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rules"
        options={{
          title: "Règles",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "extension-puzzle" : "extension-puzzle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
