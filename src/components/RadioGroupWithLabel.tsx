import type { SizeTokens } from "tamagui";
import { Label, RadioGroup, XStack } from "tamagui";
import uuid from "react-native-uuid";

export const RadioGroupItemWithLabel = (props: {
  size: SizeTokens;
  value: string;
  label: string;
}) => {
  const idSugar = uuid.v4();
  const id = `radiogroup-${props.value}-${idSugar}`;

  return (
    <XStack flex={1} alignItems="center" gap="$2">
      <RadioGroup.Item
        theme="blue"
        value={props.value}
        id={id}
        size={props.size}
      >
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  );
};
