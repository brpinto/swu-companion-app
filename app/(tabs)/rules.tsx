import styled from "@emotion/native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link } from "expo-router";
import { SizableText } from "tamagui";
import { VerticalSpacer } from "@/src/components/utils/spacers";
import * as Device from "expo-device";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const POLICY_LINK = process.env.EXPO_PUBLIC_POLICY_LINK;

export default function TabTwoScreen() {
  return (
    <SafeContainer>
      <ScreenContainer
        style={{ flexDirection: "column", flex: 1, backgroundColor: "white" }}
      >
        <SizableText theme="blue" fontSize={"$8"} fontWeight="bold">
          Règles
        </SizableText>
        <VerticalSpacer factor={2} />
        <Text>
          Lire les{" "}
          <Link href={`https://${POLICY_LINK}`}>
            <Text style={{ textDecorationLine: "underline" }}>CGU</Text>
          </Link>
        </Text>
      </ScreenContainer>
    </SafeContainer>
  );
}

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
