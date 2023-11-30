import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const LocationPicker = ({ onSelectLocation, isModalVisible, closeModal }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission not granted");
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  };

  const reverseGeocodeAsync = async (location) => {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      const address = result[0] || {};

      const { city, country, postalCode, district, street, streetNumber } =
        address;

      console.log(address);

      const locationName = `${street ?? ""}, ${streetNumber ?? ""} ${
        city ?? ""
      }, ${district ?? ""},  ${postalCode ?? ""} , , ,`;
      return locationName;
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      return "Unknown Location";
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      const location = await getLocationAsync();
      setUserLocation(location);
    };

    fetchUserLocation();
  }, []);

  const handleMapPress = async (event) => {
    const pickedLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };

    setPickedLocation(pickedLocation);

    const locationName = await reverseGeocodeAsync(pickedLocation);
    setLocationName(locationName);

    onSelectLocation(locationName);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isModalVisible}>
      <View style={styles.container}>
        <Text style={styles.title}>Pick Your Location</Text>
        {userLocation && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
          >
            {pickedLocation && (
              <Marker
                coordinate={{
                  latitude: pickedLocation.latitude,
                  longitude: pickedLocation.longitude,
                }}
                title="Picked Location"
              />
            )}
          </MapView>
        )}
        <Text style={styles.locationName}>Picked Location: {locationName}</Text>
        <Button title="Continue" onPress={closeModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: 300,
  },
  locationName: {
    fontSize: 16,
    marginTop: 16,
    color: "black",
    paddingVertical: 5,
    marginBottom: 10,
  },
});

export default LocationPicker;
