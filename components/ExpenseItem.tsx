import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { Expense } from "../types";
import { formatCurrency,formatDate } from "../utils/format";

type Props = {
  item: Expense;
  onDelete?: (id: string) => void;
};

export default function ExpenseItem({ item, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.meta}>
          {item.category ?? "Sin categoría"} · {formatDate(item.date)}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
        {onDelete && (
          <Pressable onPress={() => onDelete(item.id)} style={styles.delete}>
            <Text style={styles.deleteText}>Eliminar</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  desc: { fontSize: 16, fontWeight: "600" },
  meta: { color: "#666", marginTop: 2 },
  right: { alignItems: "flex-end", gap: 6 },
  amount: { fontSize: 16, fontWeight: "700" },
  delete: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, backgroundColor: "#fee2e2" },
  deleteText: { color: "#b91c1c", fontWeight: "600" },
});
