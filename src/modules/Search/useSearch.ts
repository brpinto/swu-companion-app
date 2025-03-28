import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCardsQuery } from "../../queries/useCardsQuery";
import { useSearchCardsMutation } from "../../mutations/useSearchCardsMutation";
import {
  aspects,
  types,
  arenas,
  sets,
  traits,
  keywords,
  rarities,
} from "@/src/constants/Filters";

const schema = z.object({
  cardName: z.string().optional(),
  aspects: z.array(z.string()).optional(),
  types: z.array(z.string()).optional(),
  rarities: z.array(z.string()).optional(),
  arenas: z.array(z.string()).optional(),
  sets: z.array(z.string()).optional(),
  traits: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  cost: z.array(z.number()),
  power: z.array(z.number()),
  life: z.array(z.number()),
  aspectsMethod: z.string(),
  traitsMethod: z.string(),
});

type Schema = z.infer<typeof schema>;
const aspectsTab: { content: string; color: string }[] = [
  {
    content: "Vigilance",
    color: "#1E9BD1",
  },
  {
    content: "Commandement",
    color: "#00A84E",
  },
  {
    content: "Agressivité",
    color: "#C21F24",
  },
  {
    content: "Ruse",
    color: "#FBC64D",
  },
  {
    content: "Héroisme",
    color: "#999963",
  },
  {
    content: "Infâmie",
    color: "#000",
  },
  {
    content: "Neutre",
    color: "#969494",
  },
];

const setTab: Record<string, string> = {
  "Étincelle de Rébellion": "SOR",
  "Ombres de la Galaxie": "SHD",
  "Crépuscule de la République": "TWI",
};

export const useSearch = () => {
  const [filteredAspects, setFilteredAspects] = useState<string[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [filteredRarity, setFilteredRarity] = useState<string[]>([]);
  const [filteredSet, setFilteredSet] = useState<string[]>([]);
  const [filteredArenas, setFilteredArenas] = useState<string[]>([]);
  const [filteredTraits, setFilteredTraits] = useState<string[]>([]);
  const [filteredKeywords, setFilteredKeywords] = useState<string[]>([]);
  const { cardsIndex } = useCardsQuery();
  const { searchMutation } = useSearchCardsMutation();

  const parseSets = () => {
    const parsedSet: string[] = [];
    Object.keys(setTab).forEach((key) => {
      filteredSet.map((set) => {
        if (set === key) {
          parsedSet.push(setTab[key]);
        }
      });
    });
    return parsedSet.length > 0 ? parsedSet : [];
  };

  const onFormSubmit = async (formData: Schema) => {
    const setData = parseSets();
    const _aspectsMethod = formData.aspectsMethod;
    const _traitsMethod = formData.traitsMethod;

    searchMutation.mutateAsync({
      name: formData.cardName,
      aspects: {
        aspectsValue: filteredAspects,
        aspectsMethod: _aspectsMethod,
      },
      types: filteredTypes,
      rarity: filteredRarity,
      set: setData,
      arena: filteredArenas,
      traits: {
        traitsValue: filteredTraits,
        traitsMethod: _traitsMethod,
      },
      keywords: filteredKeywords,
      cost: selectedCost ? formData.cost[0] : null,
      hp: selectedHp ? formData.life[0] : null,
      power: selectedPower ? formData?.power[0] : null,
    });
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      cardName: "",
      aspects: [""],
      rarities: [""],
      types: [""],
      sets: [""],
      arenas: [""],
      traits: [""],
      cost: [0],
      power: [0],
      life: [0],
      aspectsMethod: "or",
      traitsMethod: "or",
    },
  });

  const [selectedCost, setSelectedCost] = useState<boolean>(false);
  const [selectedHp, setSelectedHp] = useState<boolean>(false);
  const [selectedPower, setSelectedPower] = useState<boolean>(false);
  const [costValue, setCostValue] = useState<number[]>([0]);
  const [lifeValue, setLifeValue] = useState<number[]>([0]);
  const [powerValue, setPowerValue] = useState<number[]>([0]);

  return {
    control,
    setSelectedHp,
    setSelectedCost,
    setSelectedPower,
    register,
    handleSubmit,
    onFormSubmit,
    cardsIndex,
    filteredAspects,
    setFilteredAspects,
    filteredTypes,
    setFilteredTypes,
    filteredRarity,
    setFilteredRarity,
    filteredSet,
    setFilteredSet,
    filteredArenas,
    setFilteredArenas,
    filteredTraits,
    setFilteredTraits,
    filteredKeywords,
    setFilteredKeywords,
    aspects,
    types,
    arenas,
    sets,
    traits,
    keywords,
    rarities,
    errors,
    aspectsTab,
    costValue,
    setCostValue,
    lifeValue,
    setLifeValue,
    powerValue,
    setPowerValue,
  };
};
