import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Image } from "react-native";
import { fetchImageURL, getServiceProviders } from "../utils/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ServiceProviders = ({ route }) => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [providerImages, setProviderImages] = useState({}); // Use an object to store images for each provider

  const { serviceName } = route.params;
  const storage = getStorage();

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

  return (
    <View>
      <Text>Services Provided</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : serviceProviders && serviceProviders.length > 0 ? (
        serviceProviders.map((provider, i) => {
          return (
            <View key={i} style={styles.card}>
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
                <Text style={styles.service}>{serviceName}</Text>
                {/* <Text>{provider.contact}</Text> */}
                <Text style={styles.price}>${provider.price}</Text>
                <Text>{provider.rating} </Text>
              </View>
            </View>
          );
        })
      ) : (
        <View>
          <Text>These Services can't be provided at your location</Text>
        </View>
      )}
    </View>
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
    fontSize: 18,
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
    fontSize: 17,
    paddingVertical: 12,
  },
});

export default ServiceProviders;
