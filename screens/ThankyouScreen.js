import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Button } from "react-native";
import { Text, View } from "react-native";

const ThankyouScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate("Main"), 8000);
  }, []);
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.text}>
        Thank You for Booking! We will get in touch with you soon
      </Text>

      <Button
        onPress={() => navigation.navigate("Main")}
        title="Back to Home"
      />
    </SafeAreaView>
  );
};

export default ThankyouScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
