import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Icon from "@/assets/images/puzzle-icon.svg";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import * as MailComposer from "expo-mail-composer";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { FIRESTORE_DB } from "@/utils/FirebaseConfig";
import LoginModal from "@/components/LoginModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Page = () => {
  const loginModalRef = useRef<BottomSheetModal>(null);
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true);

  const { win, word, gameField } = useLocalSearchParams<{
    win: string;
    word: string;
    gameField?: string;
  }>();
  const router = useRouter();
  const { user } = useUser();
  const [userScore, setUserScore] = useState<any>(null);

  useEffect(() => {
    updateHighscore();
  }, [user]);

  const updateHighscore = async () => {
    if (!user) return;

    const docRef = doc(FIRESTORE_DB, `highscore/${user.id}`);
    const userScore = await getDoc(docRef);

    let newScore = {
      played: 1,
      wins: win === "true" ? 1 : 0,
      lastGame: win === "true" ? "win" : "loss",
      currentStreak: win === "true" ? 1 : 0,
    };

    if (userScore.exists()) {
      const data = userScore.data();

      newScore = {
        played: data.played + 1,
        wins: win === "true" ? data.wins + 1 : data.wins,
        lastGame: win === "true" ? "win" : "loss",
        currentStreak:
          win === "true" && data.lastGame === "win"
            ? data.currentStreak + 1
            : 0,
      };
    }
    await setDoc(docRef, newScore);
    setUserScore(newScore);
  };

  const shareGame = () => {
    const game = JSON.parse(gameField!);
    const imageText: string[][] = [];

    const wordLetters = word.split("");

    game.forEach((row: [], rowIndex: number) => {
      imageText.push([]);
      row.forEach((letter, index) => {
        if (letter === wordLetters[index]) {
          imageText[rowIndex].push("🟩");
        } else if (wordLetters.includes(letter)) {
          imageText[rowIndex].push("🟨");
        } else {
          imageText[rowIndex].push("⬜");
        }
      });
    });

    const html = `
      <html>
        <head>
          <style>

            .game {
              display: flex;
              flex-direction: column;
            }
              .row {
              display: flex;
              flex-direction: row;

              }
            .cell {
              display: flex;
              justify-content: center;
              align-items: center;
            }

          </style>
        </head>
        <body>
          <h1>Wordle</h1>
          <div class="game">
           ${imageText
             .map(
               (row) =>
                 `<div class="row">${row
                   .map((cell) => `<div class="cell">${cell}</div>`)
                   .join("")}</div>`
             )
             .join("")}
          </div>
        </body>
      </html>
    `;

    MailComposer.composeAsync({
      subject: `I just played Wordle!`,
      body: html,
      isHtml: true,
    });
  };

  const navigateRoot = () => {
    router.dismissAll();
    router.replace("/");
  };

  const handlePresentSubscribeModalPress = () => {
    loginModalRef.current?.present();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigateRoot}
        style={{
          alignSelf: "flex-end",
          marginTop: "10%",
        }}
      >
        <Ionicons name="close" size={30} color={Colors.light.gray} />
      </TouchableOpacity>

      <View style={styles.header}>
        {win === "true" ? (
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={require("@/assets/images/win.jpg")}
          />
        ) : (
          <Icon width={100} height={70} />
        )}

        <Text style={styles.title}>
          {win === "true" ? "Congratulations!" : "Thanks for playing!"}
        </Text>
        <SignedOut>
          <Text style={styles.text}>Want to see your stats and streaks?</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={handlePresentSubscribeModalPress}
          >
            <Text style={styles.btnText}>Create a free account</Text>
          </TouchableOpacity>
        </SignedOut>

        <SignedIn>
          <Text style={styles.text}>Scoreboard</Text>
          <View style={styles.stats}>
            <View>
              <Text style={styles.score}>{userScore?.played}</Text>
              <Text>Played</Text>
            </View>
            <View>
              <Text style={styles.score}>{userScore?.wins}</Text>
              <Text>Wins</Text>
            </View>
            <View>
              <Text style={styles.score}>{userScore?.currentStreak}</Text>
              <Text>Current Streak</Text>
            </View>
          </View>
        </SignedIn>

        <View
          style={{
            height: StyleSheet.hairlineWidth,
            width: "100%",
            backgroundColor: "#4e4e4e",
          }}
        />
        <SignedIn>
          <Link href={"/game"} style={styles.btn} asChild>
            <TouchableOpacity>
              <Text style={styles.btnText}>Play Again!</Text>
            </TouchableOpacity>
          </Link>
        </SignedIn>
      </View>
      <LoginModal ref={loginModalRef} />
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  header: {
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 38,
    fontFamily: "FrankRuhlLibre_800ExtraBold",
    textAlign: "center",
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "FrankRuhlLibre_500Medium",
  },
  btn: {
    justifyContent: "center",
    borderRadius: 30,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textLink: {
    textDecorationLine: "underline",
    fontSize: 16,
    paddingVertical: 15,
  },
  iconBtn: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.green,
    borderRadius: 30,
    width: "70%",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    gap: 10,
  },
  score: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
