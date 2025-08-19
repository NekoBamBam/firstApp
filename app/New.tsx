import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { addExpense } from "../lib/storage";
import { uid } from "../utils/format";
import { useRouter } from "expo-router";

export default function NewExpense() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const save = async () => {
    const parsed = Number(amount.replace(",", "."));
    if (isNaN(parsed) || parsed <= 0) {
      Alert.alert("Monto inválido", "Ingresá un número mayor a 0");
      return;
    }
    if (!description.trim()) {
      Alert.alert("Descripción requerida", "Contá en qué gastaste");
      return;
    }
    const now = new Date().toISOString();
    await addExpense({
      id: uid(),
      amount: parsed,
      description: description.trim(),
      category: category.trim() || undefined,
      date: now,
      createdAt: now,
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Monto</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="Ej: 1200.50"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Ej: Café con medialunas"
        style={styles.input}
      />

      <Text style={styles.label}>Categoría (opcional)</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Ej: Comida"
        style={styles.input}
      />

      <Button title="Guardar" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 12, padding: 16, backgroundColor: "#fff" },
  label: { fontWeight: "600", marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
});
