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
import { Colors, GREEN, YELLOW } from "@/constants/Colors";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "@/utils/storage";

const InfoModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["65%"], []);
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
                Example
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <View style={styles.wordContainer}>
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    W
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    O
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    R
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    L
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    D
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  W {""}
                </Text>
                is in the word and in the correct place.
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <View style={{ ...styles.WordContainer, marginStart: 0 }}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    B
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.wordContainer,
                    backgroundColor: YELLOW,
                    marginStart: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    E
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    L
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    L
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    Y
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  E {""}
                </Text>
                is in the word but in the wrong place.
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <View style={{ ...styles.WordContainer, marginStart: 0 }}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    S
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    A
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    L
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.wordContainer,
                    backgroundColor: "grey",
                    marginStart: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    T
                  </Text>
                </View>
                <View style={styles.WordContainer}>
                  <Text
                    style={{
                      color: "#000",
                    }}
                  >
                    Y
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  T {""}
                </Text>
                is not in the word in any place.
              </Text>
            </View>

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
    marginTop: 5,
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
  wordContainer: {
    backgroundColor: GREEN,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  WordContainer: {
    marginLeft: 5,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});

export default InfoModal;
