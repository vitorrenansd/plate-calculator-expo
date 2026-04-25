import { BAR_WEIGHT_KG, PLATES, PlateDefinition } from "../constants/plates";

export interface PlateEntry {
  plate: PlateDefinition;
  count: number;
}

export type CalculationResult =
  | { status: "invalid" }
  | { status: "exact"; totalWeight: number; sides: PlateEntry[] }
  | {
      status: "approximate";
      requestedWeight: number;
      achievedWeight: number;
      missing: number;
      sides: PlateEntry[];
    };

export function calculatePlates(input: string): CalculationResult {
  const parsed = parseFloat(input.replace(",", "."));

  if (!input.trim() || isNaN(parsed) || parsed < BAR_WEIGHT_KG || parsed <= 0) {
    return { status: "invalid" };
  }

  const weightPerSide = (parsed - BAR_WEIGHT_KG) / 2;
  const sides = greedyFill(weightPerSide);
  const achievedPerSide = sides.reduce(
    (acc, e) => acc + e.plate.weight * e.count,
    0,
  );
  const achievedTotal = achievedPerSide * 2 + BAR_WEIGHT_KG;

  const EPSILON = 0.001;
  const missing = parseFloat((parsed - achievedTotal).toFixed(4));

  if (Math.abs(missing) < EPSILON) {
    return { status: "exact", totalWeight: parsed, sides };
  }

  return {
    status: "approximate",
    requestedWeight: parsed,
    achievedWeight: achievedTotal,
    missing,
    sides,
  };
}

function greedyFill(target: number): PlateEntry[] {
  const result: PlateEntry[] = [];
  let remaining = target;

  for (const plate of PLATES) {
    if (remaining <= 0) break;
    const count = Math.floor(remaining / plate.weight + 0.0001); // float tolerance
    if (count > 0) {
      result.push({ plate, count });
      remaining = parseFloat((remaining - plate.weight * count).toFixed(4));
    }
  }

  return result;
}
