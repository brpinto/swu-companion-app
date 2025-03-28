import { Button, Dimensions, Image } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";

type Props = {
  item: {
    name: string | null;
    number: number;
    aspects: string[] | null;
    types: string[] | null;
    cost: number | null;
    set: string | null;
    hp: number | null;
    power: number | null;
    arena: string | null;
    traits: string[] | null;
    keyword: string[] | null;
    rarity: string | null;
    arts: {
      front: string;
      back: string | null;
    };
  };
  index: number;
  scrollX: SharedValue<number>;
};
const { width } = Dimensions.get("window");

const CarouselItem = ({ item, index, scrollX }: Props) => {
  const [currentFace, setCurrentFace] = React.useState("front");

  const rnStyle = useAnimatedStyle(() => {
    return {
      //get the previous and next item on the view of the active item, only a little bit
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0, 0, width * 0.15],
            "clamp",
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            "clamp",
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height: 600,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        },
        rnStyle,
      ]}
      key={item.arts.front}
    >
      <Image
        src={
          currentFace === "front" ? item.arts.front : (item.arts.back as string)
        }
        style={{
          width: "100%",
          height: "75%",
        }}
        resizeMode="contain"
      />
      {item.arts.back ? (
        <Button
          title="🔁"
          onPress={() =>
            currentFace === "front"
              ? setCurrentFace("back")
              : setCurrentFace("front")
          }
        />
      ) : null}
    </Animated.View>
  );
};

export default CarouselItem;
