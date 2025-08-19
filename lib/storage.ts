import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Expense } from "../types";
const KEY = "@expenses";

async function readAll(): Promise<Expense[]> {
  const json = await AsyncStorage.getItem(KEY);
  if (!json) return [];
  try {
    const parsed = JSON.parse(json) as Expense[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(expenses: Expense[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(expenses));
}

export async function getExpenses(): Promise<Expense[]> {
  const all = await readAll();
  // orden más reciente primero
  return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addExpense(newExpense: Expense) {
  const all = await readAll();
  all.push(newExpense);
  await writeAll(all);
}

export async function deleteExpense(id: string) {
  const all = await readAll();
  const next = all.filter(e => e.id !== id);
  await writeAll(next);
}

export async function clearAll() {
  await AsyncStorage.removeItem(KEY);
}
