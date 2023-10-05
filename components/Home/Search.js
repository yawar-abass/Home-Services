import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { Colors } from "../../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  function findService() {}

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search.."
        placeholderTextColor="#919191"
        keyboardType="default"
        onChangeText={findService}
        value={searchValue}
        style={styles.input}
      />
      <Pressable>
        <Ionicons name="search" size={22} color="gray" style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange icon and input side by side
    alignItems: "center", // Align items vertically within the container
    backgroundColor: "#fff", // Background color for the search bar
    borderRadius: 8,
    paddingHorizontal: 16, // Add horizontal padding to the search bar
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 22,
    marginHorizontal: 20,
  },
  icon: {
    marginRight: 10, // Add margin to the right of the icon for spacing
  },
  input: {
    flex: 1, // Allow the input to grow and take up remaining space
    paddingVertical: 8, // Add vertical padding to the input
  },
});

export default Search;
