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
import { auth, usersDb } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

/* 
    issue -> One service can't be booked twice
    one create a boolean booked value in each service provider,
    two handle if someone click's on the book now btn two times same service should not be booked twice
*/

const ServiceProviderDetails = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const { provider } = route.params;
  const { image } = route.params;

  const user = auth.currentUser;
  // console.log(user);

  const handleBookService = async () => {
    try {
      if (user) {
        const userId = user.uid;
        const bookingsRef = doc(
          collection(usersDb, "users", `${userId}`, "bookings")
        );
        const bookingData = {
          userId: userId,
          selectedDate: selectedDate,
          provider: provider,
          // Add other booking details here as needed
        };

        await setDoc(bookingsRef, bookingData, { merge: true });

        navigation.navigate("ConfirmationScreen");
      } else {
        // Handle the case where the user is not authenticated
        console.error("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error booking service:", error);
    }
  };
  // console.log(provider);
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
      <TextInput
        placeholder="Select Date"
        value={selectedDate}
        onChangeText={(text) => setSelectedDate(text)}
      />
      <Button onPress={handleBookService} style={styles.button}>
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
