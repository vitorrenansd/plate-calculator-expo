export const BAR_WEIGHT_KG = 20;

export interface PlateDefinition {
  weight: number;
  color: string;
  label: string;
}

export const PLATES: PlateDefinition[] = [
  { weight: 25, color: "#E53935", label: "25kg" },
  { weight: 20, color: "#1E88E5", label: "20kg" },
  { weight: 15, color: "#FDD835", label: "15kg" },
  { weight: 10, color: "#43A047", label: "10kg" },
  { weight: 5, color: "#F5F5F5", label: "5kg" },
  { weight: 2.5, color: "#9E9E9E", label: "2.5kg" },
  { weight: 1.25, color: "#212121", label: "1.25kg" },
];
