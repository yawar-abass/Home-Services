import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
    name: nameInvalid,
    phone: phoneInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setEnteredName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredPhone(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "phone":
        setEnteredPhone(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      name: enteredName,
      email: enteredEmail,
      phone: enteredPhone,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.form}
    >
      {isLogin && (
        <View style={{ paddingTop: 30 }}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.tinyLogo}
              source={require("../../assets/login.jpg")}
            />
          </View>
          <Text style={styles.loginTitle}>Login</Text>
          <Text style={styles.loginText}>Login to continue using the app</Text>
        </View>
      )}
      {/* {!isLogin && (
        <View>
          <Text
            style={[styles.loginTitle, { paddingTop: 20, textAlign: "center" }]}
          >
            Register
          </Text>
          <Text style={[styles.loginText, { textAlign: "center" }]}>
            Enter Your Personal Information
          </Text>
        </View>
      )} */}
      <View>
        {!isLogin && (
          <Input
            label="Name"
            onUpdateValue={updateInputValueHandler.bind(this, "name")}
            value={enteredName}
            placeholder="Enter your name"
            keyboardType="default"
            isInvalid={nameInvalid}
          />
        )}
        <Input
          label="Email"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Phone"
            onUpdateValue={updateInputValueHandler.bind(this, "phone")}
            value={enteredPhone}
            keyboardType="number-pad"
            placeholder="Enter your phone"
            isInvalid={phoneInvalid}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          placeholder="Enter password"
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            placeholder="Confirm password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
  },
  tinyLogo: {
    height: 200,
    width: 200,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginTitle: {
    fontSize: 25,
    fontWeight: "600",
    // margin: 10,
  },
  loginText: {
    fontSize: 14,
    color: "#a9a9a9",
    marginVertical: 12,
    marginBottom: 20,
  },
});
