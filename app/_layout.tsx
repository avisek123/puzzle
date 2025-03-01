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
// import { useMMKVBoolean } from "react-native-mmkv";
// import { storage } from "@/utils/storage";
import { Appearance, Platform } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [dark] = useMMKVBoolean("dark-mode", storage);

  // useEffect(() => {
  //   if (Platform.OS !== "web") {
  //     Appearance.setColorScheme(dark ? "dark" : "light");
  //   }
  // }, [dark]);
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
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" />
                <Stack.Screen
                  name="game"
                  options={{
                    headerBackTitle: "Puzzly",
                    headerTitle: "Puzzly",
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
                  options={{
                    presentation: "fullScreenModal",
                    title: "",
                    headerShadowVisible: false,
                    // headerStyle: {
                    //   backgroundColor: '#fff',
                    // },
                    // headerTransparent: true,
                    // headerShown: false,
                  }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
