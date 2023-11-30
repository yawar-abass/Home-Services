import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { usersDb } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "../components/Home/Search";
import MainSlider from "../components/Home/Carousel";
import Services from "../components/Home/Services";
import RecomendedServices from "../components/Home/RecomendedServices";
import Header from "../components/Home/Header";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getServiceProviders } from "../utils/helper";
import { ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";

function WelcomeScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const uid = authCtx?.uid;
  const [userData, setUserData] = useState(null);

  const [serviceProviders, setServiceProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [providerImages, setProviderImages] = useState({});
  const storage = getStorage();

  const auth = getAuth();
  const user = auth.currentUser;
  const uidCur = user?.uid;
  useEffect(() => {
    async function getUserDetails() {
      try {
        // Get the document reference
        const docRef = doc(usersDb, "users", `${uidCur}`);

        // Fetch the document data
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserData(data);
          await authCtx.userProfile(data);
          console.log("User data:", data);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    }
    getUserDetails();
  }, [uidCur]);

  useEffect(() => {
    async function getDetails() {
      try {
        const data = await getServiceProviders();
        // Extract the values (service provider objects) into an array
        const serviceProviderArray = Object.values(data);

        setServiceProviders(serviceProviderArray);
      } catch (error) {
        console.error("Error fetching service providers:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getDetails();
  }, []);

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

  console.log(userData);

  return (
    <SafeAreaView style={styles.rootContainer}>
      {isLoading ? (
        <ActivityIndicator
          size="extralarge"
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
          color="#0000ff"
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Header name={userData?.name} />
          <Search />
          <MainSlider />
          <Services />
          <RecomendedServices
            serviceProviders={serviceProviders}
            providerImages={providerImages}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: 50,
    flex: 1,
    height: "100%",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
