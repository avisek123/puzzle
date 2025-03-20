import { View, StyleSheet, Text, TouchableOpacity, Switch } from "react-native";
import React, { forwardRef, useCallback, useEffect, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
export type Ref = BottomSheetModal;
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { router } from "expo-router";
export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginModal = forwardRef<Ref>((props, ref) => {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const snapPoints = useMemo(() => ["35%"], []);
  const { dismiss } = useBottomSheetModal();

  const onPress = useCallback(async () => {
    dismiss();
    try {
      const response = await startSSOFlow({
        strategy: "oauth_google",
      });

      console.log("response", response);

      const { createdSessionId, setActive } = response;

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        // router.push("/game");
      } else {
        console.log("HELLO NOT WORKING");
      }
    } catch (err) {
      console.error("SSO Flow Error:", JSON.stringify(err, null, 2));
    }
  }, []);

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
          <View
            style={{
              flex: 1,
            }}
          >
            <Text style={styles.containerHeadline}>
              Log in or create an account
            </Text>
            <Text style={styles.subText}>
              By continuing, you agree to the Terms of Service, and Privacy
              Policy.
            </Text>
          </View>
        </View>
        <View style={{ gap: 20 }}>
          <TouchableOpacity onPress={onPress} style={styles.btnOutline}>
            <Ionicons name="logo-google" size={24} style={styles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            disabled
            style={{
              ...styles.btnOutline,
              backgroundColor: "grey",
              borderColor: "grey",
            }}
          >
            <Ionicons name="logo-facebook" size={24} style={styles.btnIcon} />
            <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => dismiss()}
            style={styles.btnOutlineOne}
          >
            <Text style={styles.btnOutlineTextOne}>Close</Text>
          </TouchableOpacity>
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

    fontWeight: "bold",
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
  subText: {
    fontSize: 14,
    color: "#4f4f4f",

    marginBottom: 30,
  },
  btnOutline: {
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#000",
    height: 50,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "90%",
    alignSelf: "center",
  },
  btnOutlineOne: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    height: 50,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "90%",
    alignSelf: "center",
  },
  btnOutlineText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  btnOutlineTextOne: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  btnIcon: {
    paddingRight: 10,
    color: "#fff",
  },
});

export default LoginModal;
