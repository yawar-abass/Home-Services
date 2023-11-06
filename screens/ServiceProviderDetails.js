import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import Button from "../components/ui/Button";

/* 
    issue -> One service can't be booked twice
    one create a boolean booked value in each service provider,
    two handle if someone click's on the book now btn two times same service should not be booked twice
*/

const ServiceProviderDetails = ({ route, navigation }) => {
  const { image } = route.params;
  const { provider } = route.params;

  return (
    <SafeAreaView>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <Text> Service Provider Details Screen</Text>
      <Text> {provider.name}</Text>
      <Text> {provider.contact}</Text>
      <Text> {provider.name}</Text>
      <Text> Need to show the reviews as well</Text>

      <Button
        onPress={() => navigation.navigate("ConfirmationScreen", { provider })}
        style={styles.button}
      >
        Book Now
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  button: {
    width: 100,
  },
});

export default ServiceProviderDetails;
