import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const Header = ({ name }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../assets/827.jpg")}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.titleContainer}>
          <Text style={styles.title}>Good Morning 👋</Text>
          <Text style={styles.user}>{name}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.notifi}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Ionicons name="notifications-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    // backgroundColor: "red",
    flexDirection: "row",
    // gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 999,
  },
  titleContainer: {
    flex: 1,
    padding: 3,
  },
  title: {
    fontSize: 16,
    color: "gray",
  },
  user: {
    fontSize: 21,
    fontWeight: "500",
  },
  notifi: {
    marginRight: 15,
  },
});

export default Header;
