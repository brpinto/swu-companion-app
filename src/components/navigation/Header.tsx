import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { Button, XStack } from "tamagui";

export const HeaderNav = () => {
  const { goBack } = useNavigation();

  return (
    <XStack $sm={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <Button
        icon={<Ionicons name="chevron-back" size={35} />}
        unstyled
        onPress={goBack}
      />
    </XStack>
  );
};
