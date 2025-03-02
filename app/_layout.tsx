import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  useFonts,
  FrankRuhlLibre_800ExtraBold,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_900Black,
} from "@expo-google-fonts/frank-ruhl-libre";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { useColorScheme } from "@/hooks/useColorScheme";
import { tokenCache } from "@/utils/cache";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Appearance, Platform } from "react-native";
import * as Linking from "expo-linking";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  let [fontsLoaded] = useFonts({
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Handle deep linking manually
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const url = event.url;
      console.log("Deep link detected:", url);

      if (url.includes("sso-callback")) {
        // Navigate to a specific page after login if needed
        router.replace("/"); // Redirect to home instead of 404
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen options={{ headerShown: false }} name="index" />
                <Stack.Screen name="login" />
                <Stack.Screen
                  name="game"
                  options={{
                    headerBackTitle: "Puzzly",
                    headerTitle: "Puzzle Word",
                    headerTitleAlign: "left",
                    headerTitleStyle: {
                      fontSize: 26,
                      fontFamily: "FrankRuhlLibre_800ExtraBold",
                    },
                    headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
                    headerBackTitleStyle: {
                      fontSize: 26,
                    },
                    title: "",
                  }}
                />
                <Stack.Screen
                  name="end"
                  options={{ presentation: "modal", headerShown: false }}
                />
                <Stack.Screen name="sso-callback" />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
