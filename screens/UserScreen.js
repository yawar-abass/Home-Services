import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Button,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import {
  getAuth,
  signOut,
  updateProfile,
  updateEmail,
  updatePhoneNumber,
  updatePassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../store/auth-context";

const UserScreen = ({ navigation }) => {
  const auth = getAuth();
  const authCtx = useContext(AuthContext);
  const user = auth.currentUser;

  const [newName, setNewName] = useState(user?.displayName || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [newPhone, setNewPhone] = useState(user?.phoneNumber || "");
  const [newPassword, setNewPassword] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [updateType, setUpdateType] = useState("");

  function logoutHandler() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        AsyncStorage.removeItem("uid");
        authCtx.storeUid("");
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
        Alert.alert("Sign Out:", "Sign out failded");
      });
  }
  const userData = authCtx.userData;

  function deleteUser() {
    deleteUser(user)
      .then(() => {
        Alert.alert("Account deleted:", "Your Account has been deleted");
        logoutHandler();
      })
      .catch((error) => {
        // An error ocurred
        // ...
        console.log(error.message);
        Alert.alert("Error:", "Your account can't be deleted");
      });
  }

  function updateProfileHandler() {
    updateProfile(auth.currentUser, {
      displayName: newName,
      // Add any other fields you want to update
    })
      .then(() => {
        // Profile updated successfully
        Alert.alert("Profile Updated", "Your profile has been updated.");
      })
      .catch((error) => {
        // Handle errors
        Alert.alert("Error", error.message);
      });
  }

  function updateEmailHandler() {
    updateEmail(auth.currentUser, newEmail)
      .then(() => {
        // Email updated successfully
        Alert.alert("Email Updated", "Your email address has been updated.");
      })
      .catch((error) => {
        // Handle errors
        Alert.alert("Error", error.message);
      });
  }

  function updatePhoneHandler() {
    updatePhoneNumber(auth.currentUser, newPhone)
      .then(() => {
        // Phone number updated successfully
        Alert.alert(
          "Phone Number Updated",
          "Your phone number has been updated."
        );
      })
      .catch((error) => {
        // Handle errors
        Alert.alert("Error", error.message);
      });
  }

  function changePassword(newPassword) {
    updatePassword(user, newPassword)
      .then(() => {
        // Update successful.
        Alert.alert(
          "Password Updated sucessfully!",
          "Your Pasword has been updated."
        );
      })
      .catch((error) => {
        // An error ocurred
        // ...
        Alert.alert("Error", error.message);
      });
  }
  // deleteUser();
  // logoutHandler();

  // console.log("userData: ", userData);

  function showModal(type) {
    setModalVisible(true);
    setUpdateType(type);
  }

  function hideModal() {
    setModalVisible(false);
  }

  function updateInfo() {
    hideModal();

    switch (updateType) {
      case "name":
        updateProfileHandler();
        break;
      case "email":
        updateEmailHandler();
        break;
      case "phone":
        updatePhoneHandler();
        break;
      case "password":
        changePassword(newPassword);
        break;
      default:
        break;
    }
  }

  return (
    <SafeAreaView>
      {userData ? (
        <ScrollView style={styles.root}>
          <View style={styles.imgCont}>
            <Image style={styles.img} source={require("../assets/827.jpg")} />
            <Text style={styles.name}>
              {user?.displayName ?? userData.name}
            </Text>
            <Text style={styles.email}>
              {user?.email ?? userData.email}
              {" | "}
              {user?.phone ?? userData.phone}
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "500",
                fontSize: 18,
                paddingTop: 10,
              }}
            >
              Edit Profile:
            </Text>
          </View>

          <View style={styles.updateContainer}>
            <Pressable
              onPress={() => showModal("name")}
              style={{
                elevation: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <Text style={styles.options}>Update Name</Text>
            </Pressable>
            <Pressable
              onPress={() => showModal("email")}
              style={{
                elevation: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <Text style={styles.options}>Update Email</Text>
            </Pressable>
            <Pressable
              onPress={() => showModal("phone")}
              style={{
                elevation: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <Text style={styles.options}>Update Phone</Text>
            </Pressable>

            <Pressable
              onPress={() => showModal("password")}
              style={{
                elevation: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                margin: 10,
              }}
            >
              <Text style={styles.options}>Change Your Password</Text>
            </Pressable>

            {/* Modal for user input */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={hideModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    Update{" "}
                    {updateType.charAt(0).toUpperCase() + updateType.slice(1)}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={`New ${
                      updateType.charAt(0).toUpperCase() + updateType.slice(1)
                    }`}
                    value={
                      updateType === "name"
                        ? newName
                        : updateType === "email"
                        ? newEmail
                        : updateType === "password"
                        ? newPassword
                        : newPhone
                    }
                    onChangeText={(text) => {
                      switch (updateType) {
                        case "name":
                          setNewName(text);
                          break;
                        case "email":
                          setNewEmail(text);
                          break;
                        case "phone":
                          setNewPhone(text);
                          break;
                        case "password":
                          setNewPassword(text);
                          break;
                        default:
                          break;
                      }
                    }}
                  />
                  <Pressable style={styles.modalButton} onPress={updateInfo}>
                    <Text style={styles.modalButtonText}>Update</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          <View
            style={{
              marginHorizontal: 25,
              // padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button title="  Logout  " onPress={logoutHandler} />
          </View>
          {/* 
          <TouchableOpacity onPress={deleteUser}>
            <Text>Delete Your Profile</Text>
          </TouchableOpacity> */}
          {/* <Button title="Delete Your" onPress={logoutHandler} /> */}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { width: "100%", height: "100%", backgroundColor: "#fff" },
  imgCont: { justifyContent: "center", alignItems: "center" },
  img: {
    width: 200,
    height: 200,
    borderRadius: 99,
    borderColor: "black",
    borderWidth: 2,
  },
  name: {
    fontSize: 23,
    fontWeight: "500",
    paddingTop: 15,
    paddingBottom: 3,
  },
  email: {
    fontSize: 16,
    fontWeight: "300",
    paddingBottom: 15,
  },

  options: {
    fontSize: 17,
    textAlign: "center",
    padding: 15,
  },
  updateContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserScreen;
