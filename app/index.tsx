import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import Icon from "@/assets/images/puzzle-icon.svg";
import { format } from "date-fns";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/ThemedText";
import { Link } from "expo-router";

import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
} from "react-native-reanimated";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import LoginModal from "@/components/LoginModal";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function Index() {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const loginModalRef = useRef<BottomSheetModal>(null);
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  const { signOut } = useAuth();
  const { width } = useWindowDimensions();

  const handlePresentSubscribeModalPress = () => {
    loginModalRef.current?.present();
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={styles.header} entering={FadeInDown}>
        <Icon width={100} height={70} />
        <ThemedText style={styles.title}>Puzzle Word</ThemedText>
        <ThemedText style={styles.text}>
          Crack the word in 6 attempts—can you do it?
        </ThemedText>
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
            <ThemedText style={styles.btnText}>Sign out</ThemedText>
          </AnimatedTouchableOpacity>
        </SignedIn>
      </View>

      <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
        <ThemedText style={styles.footerDate}>
          {user?.primaryEmailAddress?.emailAddress}
        </ThemedText>

        <ThemedText style={styles.footerText}>
          {format(new Date(), "MMMM d, yyyy")}
        </ThemedText>
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
});
