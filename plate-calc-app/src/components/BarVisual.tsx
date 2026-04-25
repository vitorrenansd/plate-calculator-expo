import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { PlateEntry } from "../logic/calculatePlates";

interface Props {
  sides: PlateEntry[];
}

export function BarVisual({ sides }: Props) {
  // Flatten plates into individual items for display (innermost first = largest first)
  const platesInOrder: Array<{ color: string; label: string; weight: number }> =
    [];
  for (const entry of sides) {
    for (let i = 0; i < entry.count; i++) {
      platesInOrder.push({
        color: entry.plate.color,
        label: entry.plate.label,
        weight: entry.plate.weight,
      });
    }
  }

  // Left side: plates go from outer to inner (reversed order for display)
  const leftSide = [...platesInOrder].reverse();
  // Right side: plates go from inner to outer (natural order)
  const rightSide = [...platesInOrder];

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Left plates */}
        <View style={styles.side}>
          {leftSide.map((p, i) => (
            <Plate
              key={`L-${i}`}
              color={p.color}
              label={p.label}
              weight={p.weight}
            />
          ))}
          {leftSide.length === 0 && <View style={styles.emptySlot} />}
        </View>

        {/* Bar */}
        <View style={styles.barContainer}>
          <View style={styles.barCollar} />
          <View style={styles.barTube}>
            <Text style={styles.barLabel}>BARRA</Text>
          </View>
          <View style={styles.barCollar} />
        </View>

        {/* Right plates */}
        <View style={styles.side}>
          {rightSide.map((p, i) => (
            <Plate
              key={`R-${i}`}
              color={p.color}
              label={p.label}
              weight={p.weight}
            />
          ))}
          {rightSide.length === 0 && <View style={styles.emptySlot} />}
        </View>
      </ScrollView>
    </View>
  );
}

function Plate({
  color,
  label,
  weight,
}: {
  color: string;
  label: string;
  weight: number;
}) {
  // Plate height proportional to weight label
  const isLarge = weight >= 20;
  const isMedium = weight >= 10;
  const isSmall = weight >= 5;
  const height = isLarge ? 72 : isMedium ? 60 : isSmall ? 46 : 34;

  const width = 18;
  const textColor =
    color === "#F5F5F5" || color === "#FDD835" ? "#212121" : "#FFFFFF";

  return (
    <View style={[styles.plate, { backgroundColor: color, height, width }]}>
      <Text style={[styles.plateText, { color: textColor }]} numberOfLines={1}>
        {label.replace("kg", "")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
    height: 100,
    justifyContent: "center",
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  side: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptySlot: {
    width: 12,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  barCollar: {
    width: 10,
    height: 24,
    backgroundColor: "#757575",
    borderRadius: 2,
  },
  barTube: {
    width: 100,
    height: 10,
    backgroundColor: "#9E9E9E",
    alignItems: "center",
    justifyContent: "center",
  },
  barLabel: {
    color: "#212121",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 1,
  },
  plate: {
    borderRadius: 3,
    marginHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  plateText: {
    fontSize: 7,
    fontWeight: "700",
    transform: [{ rotate: "90deg" }],
  },
});
