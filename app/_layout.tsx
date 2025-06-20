import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#5B0F79',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}>
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="movie/[id]"
      options={{
        headerShown: false,
      }}
    />
  </Stack>;
}
