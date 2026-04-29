import React, { useState, useEffect } from "react";
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
  Linking,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  calculatePlates,
  CalculationResult,
} from "./src/logic/calculatePlates";
import { PlateResult } from "./src/components/PlateResult";
import { BarVisual } from "./src/components/BarVisual";

const APP_VERSION = "1.1.0";
const VERSION_URL =
  "https://raw.githubusercontent.com/vitorrenansd/plate-calculator-expo/main/version.json";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [updateUrl, setUpdateUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(VERSION_URL)
      .then((r) => r.json())
      .then((data) => {
        if (data.version !== APP_VERSION) {
          setUpdateUrl(data.downloadUrl);
        }
      })
      .catch(() => {});
  }, []);

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

        {/* Update banner */}
        {updateUrl && (
          <TouchableOpacity
            style={styles.updateBanner}
            onPress={() => Linking.openURL(updateUrl)}
            activeOpacity={0.8}
          >
            <Text style={styles.updateText}>
              Nova versão disponível! Toque para baixar
            </Text>
          </TouchableOpacity>
        )}

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
              <Text style={styles.title}>CALCULANILHA</Text>
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

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                "Não fui eu que ordenei a você? Seja forte e corajoso! Não se
                apavore nem desanime, pois o Senhor, o seu Deus, estará com você
                por onde você andar." Josué 1:9
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://github.com/vitorrenansd")
                }
              >
                <Text style={styles.footerLink}>github.com/vitorrenansd</Text>
              </TouchableOpacity>
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
  updateBanner: {
    backgroundColor: "#E53935",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  updateText: {
    color: "#111111",
    fontSize: 13,
    fontWeight: "700",
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
  footerContainer: {
    alignItems: "center",
    paddingVertical: 16,
    gap: 4,
  },
  footerText: {
    color: "#333333",
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
    paddingHorizontal: 24,
  },
  footerLink: {
    color: "#444444",
    fontSize: 14,
    textAlign: "center",
  },
});
