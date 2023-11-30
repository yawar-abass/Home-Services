// ForgotPasswordScreen.js

import React, { useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Button from "../components/ui/Button";
import Input from "../components/Auth/Input";
import { Colors } from "../constants/styles";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  // Changing the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Forgot Password",
    });
  }, [navigation]);

  const handleResetPassword = async () => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..

        setIsLoading(false);
        Alert.alert(
          "Password Reset",
          "Check your email to reset your password."
        );
        navigation.navigate("Login");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;

        Alert.alert("Error", error.message.slice(22, error.message.length - 2));
        // ..
      });
  };

  return (
    <View style={styles.inputContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.label}>Enter the email:</Text>
          <TextInput
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.input}
          />
          <View style={{ marginTop: 20 }}>
            <Button onPress={handleResetPassword}>Reset Password</Button>
          </View>
        </>
      )}
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    height: "100%",
    justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 18,
  },
  label: {
    // color: "white",
    fontSize: 17,
    marginBottom: 10,
    // fontWeight: 500,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#F7F8FA",
    borderRadius: 99,
    fontSize: 16,
    // width: "100%",
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
