import styled from "@emotion/native";
import { Text } from "react-native";
import { useCloudButton } from "./useCloudButton";

interface CloudButtonProps {
  content: string;
  color: string;
  // isSelected: boolean;
  onPress: () => void;
}

export const CloudButton = (props: CloudButtonProps) => {
  const { content, color, onPress } = props;
  const { isSelected, setIsSelected } = useCloudButton();

  return (
    <CloudPressable
      onPress={() => {
        onPress();
        setIsSelected(!isSelected);
      }}
      isSelected={isSelected}
      color={color}
    >
      <Text style={{ color: isSelected ? color : "#ADADAD" }}>{content}</Text>
    </CloudPressable>
  );
};

const CloudPressable = styled.Pressable<{ isSelected: boolean; color: string }>(
  ({ theme, isSelected, color }) => ({
    borderWidth: 1.5,
    borderColor: isSelected ? color : "#ADADAD",
    padding: theme.unit * 1,
    borderRadius: theme.unit * 1.5,
  }),
);
