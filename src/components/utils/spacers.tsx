import { View } from "react-native";
import { scale } from "./scale";

export const HorizontalSpacer = ({ factor }: { factor: number }) => {
  return <View style={{ width: scale(8) * factor }} />;
};

export const VerticalSpacer = ({ factor }: { factor: number }) => {
  return <View style={{ height: scale(8) * factor }} />;
};
