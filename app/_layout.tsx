import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ title: "Mis gastos" }} />
        <Stack.Screen name="new" options={{ title: "Nuevo gasto" }} />
      </Stack>
    </>
  );
}
