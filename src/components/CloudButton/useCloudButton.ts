import { useState } from "react";

export const useCloudButton = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return {
    isSelected,
    setIsSelected,
  };
};
