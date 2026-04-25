import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  calculatePlates,
  CalculationResult,
} from "./src/logic/calculatePlates";
import { PlateResult } from "./src/components/PlateResult";
import { BarVisual } from "./src/components/BarVisual";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  function handleCalculate() {
    const calc = calculatePlates(input);
    setResult(calc);
  }

  const hasSides =
    result && result.status !== "invalid" && result.sides.length >= 0;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor="#111111" />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              {/* Header */}
              <Text style={styles.title}>PLATE CALC</Text>
              <Text style={styles.subtitle}>Calculadora de anilhas</Text>

              {/* Input */}
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Peso total em kg (ex: 180)"
                placeholderTextColor="#555"
                keyboardType="decimal-pad"
                returnKeyType="done"
                onSubmitEditing={handleCalculate}
                selectTextOnFocus
              />

              {/* Calculate button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleCalculate}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>CALCULAR ANILHAS</Text>
              </TouchableOpacity>

              {/* Results */}
              {result && <PlateResult result={result} />}

              {/* Bar visual */}
              {hasSides && <BarVisual sides={result!.sides} />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#111111",
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 4,
    textAlign: "center",
  },
  subtitle: {
    color: "#555555",
    fontSize: 13,
    letterSpacing: 2,
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 4,
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2C2C2C",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#E53935",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 2,
  },
});
