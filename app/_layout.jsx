import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import SafeScreen from "@/components/SafeScreen";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useLoadFonts } from "@/hooks/useLoadFonts";

export default function RootLayout() {
  const fontsLoaded = useLoadFonts(); // ⬅️ Load fonts

  const router = useRouter();
  const segments = useSegments();
  const { user, token, checkAuth, isAuthChecked } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthChecked) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen) router.replace("/(tabs)");
  }, [user, token, segments, isAuthChecked]);

  if (!isAuthChecked || !fontsLoaded) {
    return (
      <SafeAreaProvider>
        <SafeScreen>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" />
          </View>
        </SafeScreen>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
