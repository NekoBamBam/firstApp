import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import ExpenseItem from "../components/ExpenseItem";
import { getExpenses, deleteExpense } from "../lib/storage";
import { formatCurrency, isSameDay, isSameMonth } from "../utils/format";
import { useFocusEffect } from "@react-navigation/native";
import { Expense } from "../types";

export default function Home() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getExpenses();
    setExpenses(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  useEffect(() => {
    load();
  }, []);

  const today = new Date();
  const totalToday = expenses
    .filter((e) => isSameDay(new Date(e.date), today))
    .reduce((acc, e) => acc + e.amount, 0);

  const totalMonth = expenses
    .filter((e) => isSameMonth(new Date(e.date), today))
    .reduce((acc, e) => acc + e.amount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Hoy</Text>
          <Text style={styles.summaryValue}>{formatCurrency(totalToday)}</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Este mes</Text>
          <Text style={styles.summaryValue}>{formatCurrency(totalMonth)}</Text>
        </View>
        <Button title="Agregar gasto" onPress={() => router.push("/new")} />
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={load} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#666", marginTop: 40 }}>
            No hay gastos todavía. ¡Agregá el primero!
          </Text>
        }
        renderItem={({ item }) => (
          <ExpenseItem
            item={item}
            onDelete={async (id) => {
              await deleteExpense(id);
              load();
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f6" },
  summary: {
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e5e5",
  },
  summaryBox: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { color: "#666" },
  summaryValue: { fontWeight: "800", fontSize: 18 },
});
