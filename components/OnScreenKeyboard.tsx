import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

type OnScreenKeyboardProps = {
  onKeyPressed: (key: string) => void;
  greenLetters: string[];
  yellowLetters: string[];
  grayLetters: string[];
};

export const DONE = "DONE";
export const BACKSPACE = "BACKSPACE";

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", BACKSPACE],
];

const OnScreenKeyboard = ({
  onKeyPressed,
  greenLetters,
  yellowLetters,
  grayLetters,
}: OnScreenKeyboardProps) => {
  const { width } = useWindowDimensions();
  const keyWidth = Platform.OS === "web" ? 58 : (width - 60) / keys[0].length;
  const keyHeight = 45;

  const isSpecialKey = (key: string) => key === DONE || key === BACKSPACE;

  const isInLetters = (key: string) =>
    [...greenLetters, ...yellowLetters, ...grayLetters].includes(key);

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((key, keyIndex) => (
            <Pressable
              onPress={() => onKeyPressed(key)}
              key={`key-${key}`}
              style={({ pressed }) => [
                styles.key,
                {
                  width: keyWidth,
                  height: keyHeight,
                  backgroundColor: "#ddd",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                },
                isSpecialKey(key) && { width: keyWidth * 1.5 },
                pressed && { backgroundColor: "#868686" },
                {
                  backgroundColor: greenLetters.includes(key)
                    ? Colors.light.green
                    : yellowLetters.includes(key)
                    ? Colors.light.yellow
                    : grayLetters.includes(key)
                    ? Colors.light.gray
                    : "#ddd",
                },
              ]}
            >
              <Text
                style={[
                  styles.keyText,
                  key === "DONE" && { fontSize: 12 },
                  isInLetters(key) && { color: "#fff" },
                ]}
              >
                {isSpecialKey(key) ? (
                  key === DONE ? (
                    "DONE"
                  ) : (
                    <Ionicons
                      name="backspace-outline"
                      size={24}
                      color="black"
                    />
                  )
                ) : (
                  key.toUpperCase()
                )}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};
export default OnScreenKeyboard;
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    gap: 6,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  key: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  keyText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
