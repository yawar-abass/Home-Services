import React from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserScreen = ({ navigation }) => {
  const auth = getAuth();

  function logoutHandler() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
        AsyncStorage.removeItem("uid");
      })
      .catch((error) => {
        // An error happened.
        Alert.alert("Sign Out:", "Sign out failded");
      });
  }

  return (
    <SafeAreaView>
      <Text>User Screen</Text>
      <Button title="Logout" onPress={logoutHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default UserScreen;
