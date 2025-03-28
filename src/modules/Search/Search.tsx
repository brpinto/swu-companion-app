import styled from "@emotion/native";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearch } from "./useSearch";
import { Controller } from "react-hook-form";
import { Collapsible } from "../../components/Collapsible";
import { CloudButton } from "../../components/CloudButton/CloudButton";
import { VerticalSpacer } from "../../components/utils/spacers";
import { ScrollView } from "react-native";
import {
  Button,
  Text,
  Slider,
  XStack,
  YStack,
  RadioGroup,
  getTokens,
} from "tamagui";
import { RadioGroupItemWithLabel } from "@/src/components/RadioGroupWithLabel";

export const Search = () => {
  const {
    control,
    handleSubmit,
    onFormSubmit,
    errors,
    filteredAspects,
    setFilteredAspects,
    aspects,
    types,
    arenas,
    sets,
    traits,
    keywords,
    rarities,
    aspectsTab,
    filteredTypes,
    setFilteredTypes,
    setFilteredSet,
    filteredSet,
    filteredRarity,
    setFilteredRarity,
    filteredArenas,
    setFilteredArenas,
    filteredTraits,
    setFilteredTraits,
    filteredKeywords,
    setFilteredKeywords,
    setSelectedHp,
    setSelectedCost,
    setSelectedPower,
    costValue,
    setCostValue,
    lifeValue,
    setLifeValue,
    powerValue,
    setPowerValue,
  } = useSearch();

  const colorTokens = getTokens().color;
  const blue = colorTokens.$blue7Dark.val;

  return (
    <SafeContainer edges={["left", "right"]}>
      <ScreenContainer>
        <Text theme="blue" fontSize={"$8"} fontWeight="bold">
          Recherche
        </Text>
        <VerticalSpacer factor={2} />
        <View>
          <Button
            size={"$5"}
            theme={"blue"}
            onPress={handleSubmit(onFormSubmit)}
          >
            Aller au résultat
          </Button>
          <VerticalSpacer factor={2} />
          <Controller
            control={control}
            name="cardName"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <TextInput
                placeholder="Quelle carte recherchez-vous ?"
                style={{
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 5,
                  height: 50,
                  justifyContent: "center",
                  fontSize: 20,
                  paddingLeft: 10,
                }}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.cardName && <Text>{errors.cardName.message}</Text>}
        </View>
        <VerticalSpacer factor={2} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Collapsible title={"Affinité"}>
            <YStack>
              <Controller
                name="aspectsMethod"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    onValueChange={onChange}
                    value={value}
                    aria-labelledby="Select one item"
                    defaultValue="or"
                    name="form"
                  >
                    <XStack>
                      <RadioGroupItemWithLabel
                        size="$4"
                        value="or"
                        label="Ou"
                      />
                      <RadioGroupItemWithLabel
                        size="$4"
                        value="and"
                        label="Et"
                      />
                      <RadioGroupItemWithLabel
                        size="$4"
                        value="xor"
                        label="Exclure"
                      />
                    </XStack>
                  </RadioGroup>
                )}
              />
              <VerticalSpacer factor={2} />
              <CloudContainer>
                {aspects.map((aspect, index) => {
                  return (
                    <Controller
                      key={index}
                      control={control}
                      name={`aspects.${index}`}
                      defaultValue=""
                      render={() => (
                        <CloudButton
                          onPress={() => {
                            if (
                              filteredAspects.includes(
                                aspectsTab[index].content,
                              )
                            )
                              setFilteredAspects(
                                filteredAspects.filter(
                                  (el) => el !== aspectsTab[index].content,
                                ),
                              );
                            else
                              filteredAspects.push(aspectsTab[index].content);
                          }}
                          content={aspectsTab[index].content}
                          color={aspectsTab[index].color}
                        />
                      )}
                    />
                  );
                })}
              </CloudContainer>
            </YStack>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"Type"}>
            <CloudContainer>
              {types.map((type, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    name={`types.${index}`}
                    defaultValue={""}
                    render={() => (
                      <CloudButton
                        onPress={() => {
                          if (filteredTypes.includes(type))
                            setFilteredTypes(
                              filteredTypes.filter((el) => el !== type),
                            );
                          else filteredTypes.push(type);
                        }}
                        content={type}
                        color="#000"
                      />
                    )}
                  />
                );
              })}
            </CloudContainer>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"Coût"}>
            <VerticalSpacer factor={1} />
            <YStack style={{ width: "100%", paddingHorizontal: 10 }}>
              <Controller
                name="cost"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Slider
                    value={value}
                    onValueChange={(value) => {
                      setCostValue(value);
                      onChange(value);
                    }}
                    onSlideEnd={() => setSelectedCost(true)}
                    theme="blue_active"
                    size="$4"
                    width={"95%"}
                    defaultValue={[1]}
                    max={14}
                    step={1}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                    <Slider.Thumb
                      theme="blue"
                      style={{ backgroundColor: blue }}
                      size="$2"
                      circular
                      index={0}
                    />
                  </Slider>
                )}
              />
              <VerticalSpacer factor={2} />
              <XStack flex={1} justifyContent="space-between">
                <Text>0</Text>
                <Text fontWeight="bold" fontSize="$6">
                  {costValue}
                </Text>
                <Text>14</Text>
              </XStack>
            </YStack>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"Set"}>
            <CloudContainer>
              {sets.map((set, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    name={`sets.${index}`}
                    defaultValue={""}
                    render={() => (
                      <CloudButton
                        onPress={() => {
                          if (filteredSet.includes(set))
                            setFilteredSet(
                              filteredSet.filter((el) => el !== set),
                            );
                          else filteredSet.push(set);
                        }}
                        content={set}
                        color="#000"
                      />
                    )}
                  />
                );
              })}
            </CloudContainer>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"PV"}>
            <VerticalSpacer factor={1} />
            <YStack style={{ width: "100%", paddingHorizontal: 10 }}>
              <Controller
                name="life"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Slider
                    value={value}
                    onValueChange={(value) => {
                      setLifeValue(value);
                      onChange(value);
                    }}
                    onSlideEnd={() => setSelectedHp(true)}
                    theme="blue_active"
                    size="$4"
                    width={"95%"}
                    defaultValue={[1]}
                    max={30}
                    step={1}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                    <Slider.Thumb
                      theme="blue"
                      style={{ backgroundColor: blue }}
                      size="$2"
                      circular
                      index={0}
                    />
                  </Slider>
                )}
              />
              <VerticalSpacer factor={2} />
              <XStack flex={1} justifyContent="space-between">
                <Text>0</Text>
                <Text fontWeight="bold" fontSize="$6">
                  {lifeValue}
                </Text>
                <Text>30</Text>
              </XStack>
            </YStack>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"Puissance"}>
            <VerticalSpacer factor={1} />
            <YStack style={{ width: "100%", paddingHorizontal: 10 }}>
              <Controller
                name="power"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Slider
                    value={value}
                    onValueChange={(value) => {
                      setPowerValue(value);
                      onChange(value);
                    }}
                    onSlideEnd={() => setSelectedPower(true)}
                    theme="blue_active"
                    size="$4"
                    width={"95%"}
                    defaultValue={[1]}
                    max={11}
                    step={1}
                  >
                    <Slider.Track>
                      <Slider.TrackActive />
                    </Slider.Track>
                    <Slider.Thumb
                      theme="blue"
                      style={{ backgroundColor: blue }}
                      size="$2"
                      circular
                      index={0}
                    />
                  </Slider>
                )}
              />
              <VerticalSpacer factor={2} />
              <XStack flex={1} justifyContent="space-between">
                <Text>0</Text>
                <Text fontWeight="bold" fontSize="$6">
                  {powerValue}
                </Text>
                <Text>11</Text>
              </XStack>
            </YStack>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"Arène"}>
            <CloudContainer>
              {arenas.map((arena, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    name={`arenas.${index}`}
                    defaultValue={""}
                    render={() => (
                      <CloudButton
                        onPress={() => {
                          if (filteredArenas.includes(arena))
                            setFilteredArenas(
                              filteredArenas.filter((el) => el !== arena),
                            );
                          else filteredArenas.push(arena);
                        }}
                        content={arena}
                        color="#000"
                      />
                    )}
                  />
                );
              })}
            </CloudContainer>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"Trait"}>
            <YStack>
              <Controller
                name="traitsMethod"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    onValueChange={onChange}
                    value={value}
                    aria-labelledby="Select one item"
                    defaultValue="or"
                    name="form"
                  >
                    <XStack>
                      <RadioGroupItemWithLabel
                        size="$4"
                        value="or"
                        label="Ou"
                      />
                      <RadioGroupItemWithLabel
                        size="$4"
                        value="and"
                        label="Et"
                      />
                      <RadioGroupItemWithLabel
                        size="$4"
                        value="xor"
                        label="Exclure"
                      />
                    </XStack>
                  </RadioGroup>
                )}
              />
              <VerticalSpacer factor={2} />
              <CloudContainer>
                {traits.map((trait, index) => {
                  return (
                    <Controller
                      key={index}
                      control={control}
                      name={`traits.${index}`}
                      defaultValue={""}
                      render={() => (
                        <CloudButton
                          onPress={() => {
                            if (filteredTraits.includes(trait))
                              setFilteredTraits(
                                filteredTraits.filter((el) => el !== trait),
                              );
                            else filteredTraits.push(trait);
                          }}
                          content={trait}
                          color="#000"
                        />
                      )}
                    />
                  );
                })}
              </CloudContainer>
            </YStack>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"Mot-Clé"}>
            <CloudContainer>
              {keywords.map((keyword, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    name={`keywords.${index}`}
                    defaultValue={""}
                    render={() => (
                      <CloudButton
                        onPress={() => {
                          if (filteredKeywords.includes(keyword))
                            setFilteredKeywords(
                              filteredKeywords.filter((el) => el !== keyword),
                            );
                          else filteredKeywords.push(keyword);
                        }}
                        content={keyword}
                        color="#000"
                      />
                    )}
                  />
                );
              })}
            </CloudContainer>
          </Collapsible>
          <VerticalSpacer factor={2} />
          <Collapsible title={"Rareté"}>
            <CloudContainer>
              {rarities.map((rarity, index) => {
                return (
                  <Controller
                    key={index}
                    control={control}
                    name={`rarities.${index}`}
                    defaultValue={""}
                    render={() => (
                      <CloudButton
                        onPress={() => {
                          if (filteredRarity.includes(rarity))
                            setFilteredRarity(
                              filteredRarity.filter((el) => el !== rarity),
                            );
                          else filteredRarity.push(rarity);
                        }}
                        content={rarity}
                        color="#000"
                      />
                    )}
                  />
                );
              })}
            </CloudContainer>
          </Collapsible>
        </ScrollView>
      </ScreenContainer>
    </SafeContainer>
  );
};

const SafeContainer = styled(SafeAreaView)(() => ({
  flex: 1,
  backgroundColor: "white",
}));

const ScreenContainer = styled(SafeAreaView)(({ theme }) => ({
  flex: 1,
  paddingHorizontal: theme.unit * 2,
  padding: theme.unit * 4,
  backgroundColor: "white",
}));

const CloudContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.unit * 1.5,
  justifyContent: "center",
}));
