import { XStack, Label } from "tamagui";
import type { CheckboxProps } from "tamagui";

export const CheckboxWithLabel = ({
  size,
  label = "Accept terms and conditions",
}: CheckboxProps & { label?: string }) => {
  const id = `checkbox-${(size || "").toString().slice(1)}`;

  return (
    <XStack flex={1} alignItems="center" gap="$2">
      <Label size={size} htmlFor={id}>
        {label}
      </Label>
    </XStack>
  );
};
