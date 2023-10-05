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
import { db } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from "../components/Home/Search";
import MainSlider from "../components/Home/Carousel";
import Services from "../components/Home/Services";
import RecomendedServices from "../components/Home/RecomendedServices";

function WelcomeScreen({ navigation }) {
  const authCtx = useContext(AuthContext);
  const uid = authCtx.uid;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUserDetails() {
      const newUid = await AsyncStorage.getItem("uid");
      console.log(newUid + "  async uid");
      try {
        // Get the document reference
        const docRef = doc(db, "users", `${uid === undefined ? newUid : uid}`);

        // Fetch the document data
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserData(data);
          console.log("User data:", data);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    }
    getUserDetails();
  }, [uid]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Search />
        <MainSlider />
        <Services />
        <RecomendedServices />
      </ScrollView>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    // paddingVertical: 20,
    // paddingLeft: 20,
    height: "100%",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
