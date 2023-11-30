import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Services = () => {
  const navigation = useNavigation();
  const services = [
    {
      id: 0,
      name: "Cleaning",
      image: require("../../assets/services/clean.png"),
    },
    {
      id: 1,
      name: "Plumbing",
      image: require("../../assets/services/plumbing.png"),
    },
    {
      id: 2,
      name: "Repairing",
      image: require("../../assets/services/repairing.png"),
    },
    {
      id: 3,
      name: "Painting",
      image: require("../../assets/services/painter.png"),
    },
    {
      id: 4,
      name: "Carpenter",
      image: require("../../assets/services/carpenter.png"),
    },
    {
      id: 5,
      name: "Electrician",
      image: require("../../assets/services/electrician.png"),
    },
  ];

  return (
    <View style={styles.rootContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginVertical: 10,
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Popular Services</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Services")}>
          <Text
            style={{
              marginTop: 3,
              fontSize: 16,
              fontWeight: "500",
              color: Colors.primary100,
              paddingRight: 15,
            }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
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
  },
  image: {
    height: 60,
    width: 60,
  },
  serviceText: {
    width: 80,
    textAlign: "center",
    fontWeight: "500",
    paddingTop: 5,
    // fontSize: 16,
  },
});

export default Services;
