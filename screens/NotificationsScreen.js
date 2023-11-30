import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";

export default function NotificationsScreen() {
  return (
    <ScrollView style={styles.root}>
      <Text style={styles.date}>Today</Text>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={require("../assets/services/home_renovation.png")}
        />
        <View>
          <Text style={styles.title}>30% Off on Home Renovation</Text>
          <Text style={styles.desc}>Special promotion only valid Today</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    height: "100%",
  },
  date: {
    fontSize: 19,
    paddingLeft: 19,
    paddingTop: 10,
  },
  card: {
    flexDirection: "row",
    marginHorizontal: 17,
    marginVertical: 9,
    gap: 19,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
  },
  title: {
    fontSize: 17,
  },
  desc: {
    fontSize: 13,
    fontWeight: "300",
  },
});
