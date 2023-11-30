import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { usersDb } from "../firebase";
import { AuthContext } from "../store/auth-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../constants/styles";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";

const BookingsScreen = () => {
  const authCtx = useContext(AuthContext);
  const uid = authCtx.uid;
  console.log(uid);
  const [bookings, setBookings] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [providerImages, setProviderImages] = useState({});

  const storage = getStorage();
  const auth = getAuth();
  const user = auth.currentUser;

  const getBookings = async () => {
    const newUid = await AsyncStorage.getItem("uid");
    console.log(newUid);
    try {
      const docRef = doc(
        usersDb,
        "users",
        `${uid === undefined ? newUid : uid}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        // Access the "bookings" subcollection
        const bookingsCollectionRef = collection(docRef, "bookings");
        // Get all documents from the "bookings" subcollection
        const bookingsQuerySnapshot = await getDocs(bookingsCollectionRef);
        // Extract data from each booking document
        const bookingsData = bookingsQuerySnapshot.docs.map((doc) =>
          doc.data()
        );
        const serviceProviders = bookingsData.map(
          (booking) => booking.provider
        );
        // console.log("Bookings data:", bookingsData);
        setServiceProviders(serviceProviders);
        setBookings(bookingsData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error in getting user data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getBookings();
    }, [])
  );

  const cancelBooking = async (bookingId) => {
    const newUid = await AsyncStorage.getItem("uid");
    const curUid = user.id;
    try {
      const docRef = doc(
        usersDb,
        "users",
        `${uid === undefined ? newUid : uid ?? curUid}`
      );
      const bookingsCollectionRef = collection(docRef, "bookings");
      await deleteDoc(doc(bookingsCollectionRef, bookingId));
      console.log("Booking canceled successfully");
      getBookings(); // Refresh bookings after cancellation
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  useEffect(() => {
    async function loadImages() {
      const imagePromises = serviceProviders.map(async (provider) => {
        const starsRef = ref(storage, `/serviceProviders/${provider.image}`);
        try {
          const downloadURL = await getDownloadURL(starsRef);
          setProviderImages((prevImages) => ({
            ...prevImages,
            [provider.name]: downloadURL, // Store the image URL with the provider's name as the key
          }));
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      });

      // Wait for all image promises to resolve
      await Promise.all(imagePromises);
    }

    if (serviceProviders.length > 0) {
      loadImages();
    }
  }, [serviceProviders, storage]);

  console.log(bookings);

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : bookings && bookings.length > 0 ? (
        bookings.map((booking, index) => (
          // <Text key={index}>{booking.provider.name}</Text>
          <View key={index} style={styles.card}>
            <View>
              <Image
                source={{
                  uri: providerImages[booking.provider.name],
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{booking.provider.name}</Text>
              {/* <Text style={styles.service}>
                {booking.provider.services.cleaning
                  ? booking.provider[cleaning]
                  : booking.provider[plumbing]}
              </Text> */}

              <Text style={styles.price}>${booking.provider.price}</Text>
              <Text style={styles.rating}>
                <Ionicons
                  name="star"
                  size={19}
                  color="gold"
                  style={{ padding: 3, paddingRight: 8 }}
                />
                {booking.provider.rating}
                {"  "}
                <Text style={{ color: Colors.primary500, fontSize: 15 }}>
                  (110 Reviews)
                </Text>
              </Text>
              <View style={styles.book}>
                <Text>Date: {booking.bookedDate}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail">
                  Location: {booking.bookedlocation}{" "}
                </Text>
              </View>
              {/* <TouchableOpacity onPress={() => cancelBooking(booking.id)}>
                <Text style={styles.cancelButton}>Cancel Booking</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        ))
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              paddingTop: "70%",
            }}
          >
            You haven't made any booking yet!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    margin: 10,
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 170,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    // fontWeight: "500",
  },
  details: {
    margin: 10,
  },
  service: {
    fontWeight: "500",
    paddingTop: 4,
    fontSize: 19,
  },
  price: {
    color: "darkgreen",
    fontSize: 20,
    paddingVertical: 5,
  },
  rating: {
    // padding: 2,
    color: "#FF9529",
    flex: 1,
    fontWeight: "bold",
    fontSize: 15,
  },
  book: {
    padding: 4,
    // overflow: "hidden",
    width: "80%",
  },
  cancelButton: {
    color: Colors.danger,
    fontSize: 16,
    paddingTop: 8,
  },
});
