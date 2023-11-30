import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import { fetchImageURL, getServiceProviders } from "../utils/helper";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/styles";

const ServiceProviders = ({ route, navigation }) => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [providerImages, setProviderImages] = useState({}); // Use an object to store images for each provider

  const { serviceName } = route.params;
  const storage = getStorage();

  // Changing the header title
  useLayoutEffect(() => {
    navigation.setOptions({
      title: serviceName,
    });
  }, [navigation]);

  //get Service Providers
  useEffect(() => {
    async function getDetails() {
      try {
        const data = await getServiceProviders();
        // Extract the values (service provider objects) into an array
        const serviceProviderArray = Object.values(data);

        // Filter service providers based on the selected service name
        const filteredServiceProviders = serviceProviderArray.filter(
          (provider) =>
            provider.services &&
            provider.services[serviceName.toLowerCase()] === true
        );

        setServiceProviders(filteredServiceProviders);
      } catch (error) {
        console.error("Error fetching service providers:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getDetails();
  }, [serviceName]);

  //getting the url of the images that are stored at firebase storage
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
  const service = serviceName.toLowerCase();
  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : serviceProviders && serviceProviders.length > 0 ? (
        serviceProviders.map((provider, i) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("ServiceProviderDetails", {
                  provider: provider,
                  image: providerImages[provider.name],
                  service: provider[service], // service name provided by the provider
                  serviceName: serviceName, // this is the service category
                })
              }
              key={i}
              android_ripple={{ color: "#e6ebe7" }}
              style={styles.card}
            >
              <View>
                <Image
                  source={{
                    uri: providerImages[provider.name],
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{provider.name}</Text>
                <Text style={styles.service}>{provider[service]}</Text>
                {/* <Text>{provider.contact}</Text> */}
                <Text style={styles.price}>${provider.price}</Text>
                <Text style={styles.rating}>
                  <Ionicons
                    name="star"
                    size={19}
                    color="gold"
                    style={{ padding: 3, paddingRight: 8 }}
                  />
                  {provider.rating}
                  {"  "}
                  <Text style={{ color: Colors.primary500, fontSize: 15 }}>
                    (110 Reviews)
                  </Text>
                </Text>
              </View>
            </Pressable>
          );
        })
      ) : (
        <View>
          <Text>These Services can't be provided at your location</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

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
    height: 150,
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
});

export default ServiceProviders;
