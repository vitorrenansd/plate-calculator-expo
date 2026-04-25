import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CalculationResult } from "../logic/calculatePlates";

interface Props {
  result: CalculationResult;
}

export function PlateResult({ result }: Props) {
  if (result.status === "invalid") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Peso inválido</Text>
      </View>
    );
  }

  const totalWeight =
    result.status === "exact" ? result.totalWeight : result.achievedWeight;

  return (
    <View style={styles.container}>
      <Text style={styles.totalLabel}>
        Peso total: <Text style={styles.totalValue}>{totalWeight}kg</Text>
      </Text>

      {result.status === "approximate" && (
        <Text style={styles.warningText}>
          Faltaram {result.missing.toString().replace(".", ",")}kg para atingir
          o peso desejado.
        </Text>
      )}

      <Text style={styles.sideHeader}>Cada lado:</Text>

      {result.sides.length === 0 ? (
        <Text style={styles.emptyText}>Apenas a barra (20kg)</Text>
      ) : (
        result.sides.map((entry) => (
          <Text key={entry.plate.weight} style={styles.plateRow}>
            • {entry.plate.label} × {entry.count}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "#FF5252",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 8,
  },
  totalLabel: {
    color: "#BDBDBD",
    fontSize: 17,
    marginBottom: 4,
  },
  totalValue: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  warningText: {
    color: "#FFB300",
    fontSize: 14,
    marginBottom: 12,
  },
  sideHeader: {
    color: "#9E9E9E",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  plateRow: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 28,
  },
  emptyText: {
    color: "#757575",
    fontSize: 15,
    fontStyle: "italic",
  },
});
