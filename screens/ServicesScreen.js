import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../constants/styles";

export default function ServicesScreen() {
  const navigation = useNavigation();
  const services = [
    {
      id: 0,
      name: "Cleaning",
      image: require("../assets/services/clean.png"),
    },
    {
      id: 1,
      name: "Plumbing",
      image: require("../assets/services/plumbing.png"),
    },
    {
      id: 2,
      name: "Repairing",
      image: require("../assets/services/repairing.png"),
    },
    {
      id: 3,
      name: "Painting",
      image: require("../assets/services/painter.png"),
    },
    {
      id: 4,
      name: "Carpenter",
      image: require("../assets/services/carpenter.png"),
    },
    {
      id: 5,
      name: "Electrician",
      image: require("../assets/services/electrician.png"),
    },
    {
      id: 6,
      name: "Home Repair",
      image: require("../assets/services/home_repair.png"),
    },
    {
      id: 7,
      name: "Home Renovation",
      image: require("../assets/services/home_renovation.png"),
    },
    {
      id: 8,
      name: "Security",
      image: require("../assets/services/security.png"),
    },
    {
      id: 9,
      name: "Appliance Installation",
      image: require("../assets/services/appliance_installation.png"),
    },
  ];

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.servicesContainer}>
        {services.map((service) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("ServiceProviders", {
                  serviceName: service.name,
                })
              }
              key={service.id}
            >
              <View style={styles.service}>
                <View style={styles.imageContianer}>
                  <Image style={styles.image} source={service.image} />
                </View>
                <Text style={styles.serviceText}>{service.name}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,

    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  servicesContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 10,
    overflow: "hidden",
    flexWrap: "wrap",
  },
  service: {},
  imageContianer: {
    backgroundColor: "#F1EFEF",
    textAlign: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 3,
  },
  image: {
    height: 100,
    width: 100,
  },
  serviceText: {
    // width: 80,
    textAlign: "center",
    fontWeight: "500",
    paddingTop: 5,
    paddingBottom: 8,
    // fontSize: 16,
  },
});
