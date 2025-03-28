import { Stack } from "expo-router/stack";

export const unstable_settings = {
  initialRouteName: "set-show",
};

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="set-show"
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="card-show"
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
