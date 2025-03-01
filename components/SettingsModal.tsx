import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useDarkMode } from "@/app/_layout"; // Import the dark mode context

export type Ref = BottomSheetModal;

const SettingsModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const { dismiss } = useBottomSheetModal();

  // Use dark mode context
  const { darkMode, toggleDarkMode } = useDarkMode();

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
        <View style={styles.modalBtns}>
          <Text style={styles.containerHeadline}>SETTINGS</Text>
          <TouchableOpacity onPress={() => dismiss()}>
            <Ionicons name="close" size={28} color={Colors.light.gray} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTextBig}>Dark Mode</Text>
              <Text style={styles.rowTextSmall}>
                Change the app to dark mode
              </Text>
            </View>
            <Switch
              onValueChange={toggleDarkMode} // Toggle dark mode instantly
              value={darkMode}
              trackColor={{ true: "#000" }}
              ios_backgroundColor="#9a9a9a"
            />
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
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    flex: 1,
  },
  modalBtns: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#888",
  },
  rowText: {
    flex: 1,
  },
  rowTextBig: {
    fontSize: 18,
  },
  rowTextSmall: {
    fontSize: 14,
    color: "#5e5e5e",
  },
});

export default SettingsModal;
