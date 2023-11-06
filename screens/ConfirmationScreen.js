import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import { auth, database, usersDb } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable } from "react-native";
import { Colors } from "../constants/styles";
import { getDatabase, ref, child, push, update } from "firebase/database";

const ConfirmationScreen = ({ route, navigation }) => {
  const { provider } = route.params;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleLocation = (location) => {
    setLocation(location);
  };

  const user = auth.currentUser;
  // console.log(user);

  const updateBookingDetails = (
    serviceProviderId,
    bookedDate,
    bookedTime,
    location
  ) => {
    const updates = {
      bookedDate: bookedDate,
      bookedTime: bookedTime,
      bookedlocation: location,
    };

    const db = getDatabase();
    const servRef = ref(db, `services/servicesProviders/${serviceProviderId}`);
    try {
      return update(servRef, updates);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleBookService = async () => {
    try {
      if (user) {
        if (provider.bookedDate === date.toLocaleDateString()) {
          return Alert.alert(
            "Already Booked!",
            "Could not book the service on this date, Please pick another one!"
          );
        }

        const userId = user.uid;
        const bookingsRef = doc(
          collection(usersDb, "users", `${userId}`, "bookings")
        );
        const bookingData = {
          userId: userId,
          provider: provider,
          bookedDate: date.toLocaleDateString(),
          bookedTime: date.toLocaleTimeString(),
          bookedlocation: location,
          // Add other booking details here as needed
        };

        updateBookingDetails(
          provider.id,
          date.toLocaleDateString(),
          date.toLocaleTimeString(),
          location
        );

        await setDoc(bookingsRef, bookingData, { merge: true });

        navigation.navigate("ThankyouScreen");
      } else {
        // Handle the case where the user is not authenticated
        console.error("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error booking service:", error);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        onPress={showDatepicker}
      >
        <View style={{}}>
          <Text style={styles.dateText}>Select the booking date: </Text>
          <Text style={styles.sDate}>{date.toLocaleDateString()}</Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        onPress={showTimepicker}
      >
        <View style={{}}>
          <Text style={styles.dateText}>Select the booking time: </Text>
          <Text style={styles.sDate}>{date.toLocaleTimeString()}</Text>
        </View>
      </Pressable>

      <TextInput
        style={styles.input}
        onChangeText={handleLocation}
        value={location}
        placeholder="Enter location (e.g. H No., Locality , City)"
      />

      <Text style={styles.resultText}>
        Selected Date, Time: {date.toLocaleString()}
      </Text>
      <Text style={styles.resultText}>
        Selected Location: {location === "" ? "No location selected" : location}
      </Text>

      <Button
        onPress={handleBookService}
        title="Confirm Booking"
        disabled={location.length > 0 ? false : true}
      />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          // is24Hour={true}
          minimumDate={date}
          onChange={onChange}
          style={{ flex: 1, width: "100vw", backgroundColor: "blue" }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    backgroundColor: "white",
    height: "100%",
  },

  card: {
    elevation: 0.8,
    borderRadius: 10,
    backgroundColor: Colors.support1,
    margin: 10,
    // height:50,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  dateText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  sDate: {
    fontSize: 30,
    paddingTop: 12,
    opacity: 0.7,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.7,
  },

  resultText: {
    fontSize: 20,
    padding: 20,
    textAlign: "center",
  },

  input: {
    textAlign: "center",
    margin: 10,
    padding: 10,
    fontSize: 18,
    borderRadius: 2,
    borderRadius: 10,
    height: 80,
    elevation: 3,
    backgroundColor: "white",
  },
});

export default ConfirmationScreen;
