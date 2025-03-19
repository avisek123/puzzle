import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import Modal from "react-native-modal";
type Props = {
  visible: boolean;
  onClose: () => void;
};

const HowToPlayModal = ({ visible, onClose }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <View>
      <Modal onBackdropPress={onClose} isVisible={visible}>
        <View
          style={{
            flex: 0.8,
            backgroundColor: "#fff",
            width: "100%",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <View style={styles.modalBtns}>
            <View style={{ flex: 1 }}>
              <Text style={styles.containerHeadline}>How to Play</Text>
              <Text style={styles.subtitle}>
                {"Guess the Wuzzle in 6 tries."}
              </Text>
            </View>

            {/* <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color={Colors.light.gray} />
            </TouchableOpacity> */}
          </View>

          {/* Instructions */}
          <View style={{ marginHorizontal: 15, marginTop: 10 }}>
            <Text style={styles.instruction}>
              1. Each guess must be a valid 5-letter word.
            </Text>
            <Text style={[styles.instruction, { marginTop: 5 }]}>
              2. The color of the tiles will change to show how close your guess
              was to the word.
            </Text>

            {/* Example Section */}
            <View style={styles.exampleSection}>
              <Text style={styles.exampleTitle}>Example</Text>

              {/* Example 1 */}
              <View style={styles.wordRow}>
                <View style={styles.correctTile}>
                  <Text style={styles.tileText}>W</Text>
                </View>
                {["O", "R", "L", "D"].map((letter) => (
                  <View key={letter} style={styles.tile}>
                    <Text style={styles.tileTextDark}>{letter}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.explanation}>
                <Text style={styles.boldText}>W </Text>
                is in the word and in the correct place.
              </Text>

              {/* Example 2 */}
              <View style={styles.wordRow}>
                <View style={styles.tile}>
                  <Text style={styles.tileTextDark}>B</Text>
                </View>
                <View style={styles.presentTile}>
                  <Text style={styles.tileText}>E</Text>
                </View>
                {["L", "L", "Y"].map((letter, ind) => (
                  <View key={ind} style={styles.tile}>
                    <Text style={styles.tileTextDark}>{letter}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.explanation}>
                <Text style={styles.boldText}>E </Text>
                is in the word but in the wrong place.
              </Text>

              {/* Example 3 */}
              <View style={styles.wordRow}>
                {["S", "A", "L"].map((letter) => (
                  <View key={letter} style={styles.tile}>
                    <Text style={styles.tileTextDark}>{letter}</Text>
                  </View>
                ))}
                <View style={styles.absentTile}>
                  <Text style={styles.tileText}>T</Text>
                </View>
                <View style={styles.tile}>
                  <Text style={styles.tileTextDark}>Y</Text>
                </View>
              </View>
              <Text style={styles.explanation}>
                <Text style={styles.boldText}>T </Text>
                is not in the word in any place.
              </Text>
            </View>

            {/* Rewards Section */}
            <View style={styles.rewardSection}>
              <Text style={styles.rewardTitle}>🎉 Win & Get Rewarded! 🎁</Text>
              <Text style={styles.instruction}>
                1. Win just 1 game and grab a{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  ₹49
                </Text>{" "}
                Amazon voucher!
              </Text>
              <Text style={styles.instruction}>
                2. Achieve one winning streaks to unlock an{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  ₹199
                </Text>{" "}
                Amazon voucher.
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={{
                justifyContent: "center",
                alignSelf: "center",
                borderRadius: 30,
                alignItems: "center",
                borderColor: "#000",
                borderWidth: 1,
                width: "60%",
                maxWidth: 200,
                marginTop: "9%",

                backgroundColor: "#000",
              }}
            >
              <Text style={[styles.btnText, styles.primaryText]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HowToPlayModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1, // Ensure the container takes full height
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    justifyContent: "center", // Center content vertically
  },
  contentContainer: {
    gap: 10,
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.gray,
  },
  instruction: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  exampleSection: {
    marginTop: 15,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  wordRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  tile: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  correctTile: {
    backgroundColor: Colors.light.green,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  presentTile: {
    backgroundColor: Colors.light.yellow,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  absentTile: {
    backgroundColor: "#999",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  tileText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  tileTextDark: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  explanation: {
    marginTop: 4,
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
  },
  rewardSection: {
    marginTop: 15,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
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
});
