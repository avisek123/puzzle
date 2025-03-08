import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
export type Ref = BottomSheetModal;
import { Colors } from "@/constants/Colors";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "@/utils/storage";

const InfoModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["70%"], []);
  const { dismiss } = useBottomSheetModal();
  const [dark, setDark] = useMMKVBoolean("dark-mode", storage);
  const [hard, setHard] = useMMKVBoolean("hard-mode", storage);
  const [contrast, setContrast] = useMMKVBoolean("contrast-mode", storage);

  const toggleDark = () => setDark((prev) => !!!prev);
  const toggleHard = () => setHard((prev) => !!!prev);
  const toggleContrast = () => setContrast((prev) => !!!prev);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.2}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={dismiss}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      handleComponent={null}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.modalBtns}>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text style={styles.containerHeadline}>How to Play</Text>
              <Text style={styles.subtitle}>
                {"Guess the Wuzzle in 6 tries."}
              </Text>
            </View>

            <TouchableOpacity onPress={() => dismiss()}>
              <Ionicons name="close" size={28} color={Colors.light.gray} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 15,
            }}
          >
            <Text
              style={{
                textAlign: "justify",
              }}
            >
              {"1. Each guess must be a valid 5-letter word."}
            </Text>
            <Text
              style={{
                textAlign: "justify",
                marginTop: 5,
              }}
            >
              {
                "2. The color of the tiles will change to show how close your guess was to the word."
              }
            </Text>

            <View
              style={{
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                🎉 Win & Get Rewarded! 🎁
              </Text>
              <Text
                style={{
                  marginTop: 5,
                }}
              >
                {"1. Win 3 consecutive games and grab a ₹99 shopping voucher."}
              </Text>
              <Text
                style={{
                  marginTop: 5,
                }}
              >
                {
                  "2. Achieve two 3-game winning streak (non consecutive) to unlock an ₹199 Amazon voucher."
                }
              </Text>
              <Text
                style={{
                  marginTop: 5,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                More wins = Bigger rewards! 🚀
              </Text>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerHeadline: {
    fontSize: 24,
    textAlign: "left",
    fontFamily: "FrankRuhlLibre_800ExtraBold",
  },
  modalBtns: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "left",
  },
});

export default InfoModal;
