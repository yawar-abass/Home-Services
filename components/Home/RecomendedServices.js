import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { Colors, globalStyle } from "../../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

const RecomendedServices = () => {
  const width = Dimensions.get("window").width;
  const data = [
    {
      serviceName: "Ac Service",
      serviceProvider: "Jhone Doe",
      price: "234",
      image: require("../../assets/demo.png"),
    },
    {
      serviceName: "House clean",
      serviceProvider: "Jhone Doe",
      price: "234",
      image: require("../../assets/demo.png"),
    },
    {
      serviceName: "Plumber",
      serviceProvider: "Jhone Doe",
      price: "234",
      image: require("../../assets/demo.png"),
    },
  ];

  return (
    <View style>
      <Text style={[globalStyle.title, { paddingLeft: 20 }]}>
        Most booked services
      </Text>
      {/* Service Card  */}
      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 12 }}
      >
        {data.map((item, i) => {
          return (
            <View style={styles.serviceCard} key={i}>
              <Image style={styles.image} source={item.image} />
              <Text style={styles.servName}>{item.serviceName}</Text>
              <Text style={styles.servProvd}>{item.serviceProvider}</Text>
              <Text style={styles.rating}>
                {" "}
                <Ionicons
                  name="star"
                  size={19}
                  color="gold"
                  style={{ padding: 3, paddingRight: 8 }}
                />
                4.8{"  "}
                <Text style={{ color: Colors.primary500 }}>(110 Reviews)</Text>
              </Text>

              <Text style={styles.price}>${item.price}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 90,
    width: 180,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  serviceCard: {
    backgroundColor: "white",
    elevation: 4,
    width: 180,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 8,
    borderRadius: 10,
  },
  servName: {
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 8,
    // paddingVertical: 5,
    paddingTop: 10,
  },
  servProvd: {
    paddingHorizontal: 8,
    color: "gray",
    // paddingVertical: 2,
  },
  rating: {
    padding: 2,
    color: "#FF9529",
    flex: 1,
    fontWeight: "bold",
  },
  price: {
    padding: 3,
    paddingHorizontal: 8,
    fontWeight: "500",
    fontSize: 17,
    marginBottom: 12,
  },
});

export default RecomendedServices;
