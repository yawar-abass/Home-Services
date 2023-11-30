import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.navigate("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, name, phone, password, confirmPassword } = credentials;

    name = name.trim();
    phone = phone.trim();

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const nameIsValid = name.length > 3;
    const phoneIsValid = phone.length > 9;
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!nameIsValid || !phoneIsValid || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !nameIsValid,
        phone: !phoneIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password, phone, name });
  }

  return (
    <SafeAreaView style={styles.authContent}>
      <KeyboardAvoidingView>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <Text style={styles.buttonText}>
            {isLogin ? "Don't have an account? " : "Already have an account?  "}
          </Text>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? "Register" : "Login "}
          </FlatButton>
        </View>
        {isLogin && (
          <View style={styles.buttons}>
            <FlatButton onPress={() => navigation.navigate("ForgotPassword")}>
              Forgot the Password?
            </FlatButton>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    paddingTopTop: 64,
    paddingHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    height: "100%",
    backgroundColor: "white",
    // elevation: 0.25,
    // shadowColor: "black",
    // shadowOffset: { width: 0.25, height: 0.25 },
    // shadowOpacity: 0.35,
    // shadowRadius: 0.26,
  },
  buttons: {
    marginTop: 8,
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    paddingVertical: 6,
    // paddingHorizontal: 12,
  },
});
