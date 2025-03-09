import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  Linking,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import Icon from "@/assets/images/puzzle-icon.svg";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import { Link } from "expo-router";

import {
  SignedIn,
  SignedOut,
  useAuth,
  useSSO,
  useUser,
} from "@clerk/clerk-expo";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
} from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import LoginModal from "@/components/LoginModal";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { FIRESTORE_DB } from "@/utils/FirebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Index() {
  const { user } = useUser();
  const [streak, setStreak] = useState<number | null>(null); // Initialize properly
  const { isLoaded, isSignedIn, signOut } = useAuth();

  const [isSessionReady, setIsSessionReady] = useState(false);

  const colorScheme = useColorScheme();
  const loginModalRef = useRef<BottomSheetModal>(null);
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;

  const { width } = useWindowDimensions();

  const handlePresentSubscribeModalPress = () => {
    loginModalRef.current?.present();
  };

  useEffect(() => {
    let isMounted = true; // Prevent state update if unmounted

    const fetchUserStreak = async () => {
      if (!user?.id) return; // Ensure `user.id` exists before making Firestore calls

      try {
        const docRef = doc(FIRESTORE_DB, `highscore/${user.id}`);
        const userScore = await getDoc(docRef);

        if (userScore.exists() && isMounted) {
          const data = userScore.data();
          setStreak(data.currentStreak || 0); // Safe update
        }
      } catch (error) {
        console.error("Error fetching streak:", error);
      }
    };

    fetchUserStreak();

    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, [user?.id]); // De

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Prevent default behavior (app exit)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setIsSessionReady(true);
      }, 2000); // Adding a 1-second delay to ensure the session syncs properly
    }
  }, [isLoaded]);

  if (!isLoaded || !isSessionReady) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colorScheme === "light" ? "#fff" : "#000" },
      ]}
    >
      <Animated.View style={styles.header} entering={FadeInDown}>
        <Icon width={120} height={90} />
        <ThemedText style={styles.title}>Wuzzle</ThemedText>
        <ThemedText style={styles.text}>
          Crack the word in 6 attempts—can you do it?
        </ThemedText>
        <ThemedText style={styles.offerText}>Play & win</ThemedText>
      </Animated.View>

      <View
        style={[styles.menu, { flexDirection: width > 600 ? "row" : "column" }]}
      >
        <Link
          href={"/game"}
          style={[
            styles.btn,
            { backgroundColor: colorScheme === "light" ? "#000" : "#4a4a4a" },
          ]}
          asChild
        >
          <AnimatedTouchableOpacity entering={FadeInLeft}>
            <Text style={[styles.btnText, styles.primaryText]}>Play</Text>
          </AnimatedTouchableOpacity>
        </Link>

        <SignedOut>
          <AnimatedTouchableOpacity
            onPress={handlePresentSubscribeModalPress}
            style={[styles.btn, { borderColor: textColor }]}
            entering={FadeInLeft.delay(100)}
          >
            <ThemedText style={styles.btnText}>Log in</ThemedText>
          </AnimatedTouchableOpacity>
        </SignedOut>

        <SignedIn>
          <AnimatedTouchableOpacity
            onPress={() => signOut()}
            entering={FadeInLeft.delay(100)}
            style={[styles.btn, { borderColor: textColor }]}
          >
            <ThemedText style={styles.btnText}>Log out</ThemedText>
          </AnimatedTouchableOpacity>
        </SignedIn>
      </View>

      <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
        <ThemedText style={styles.footerDate}>
          {user?.primaryEmailAddress?.emailAddress}
        </ThemedText>

        {isSignedIn && (
          <ThemedText style={styles.footerText}>
            {streak !== 0
              ? `Current Streak: ${streak} 🔥`
              : "Start a streak now! 🚀"}
          </ThemedText>
        )}
      </Animated.View>

      <LoginModal ref={loginModalRef} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 40,
    paddingHorizontal: 50,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  menu: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  btn: {
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "60%",
    maxWidth: 200,
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: "semibold",
    color: "#333",
  },
  primaryItem: {
    backgroundColor: "#000",
  },
  primaryText: {
    color: "#fff",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  footerDate: {
    fontSize: 14,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    marginTop: 5,
  },
  offerText: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_800ExtraBold",
    color: "#ff9800", // Orange color for a highlight effect
    marginTop: 10,
  },
});
