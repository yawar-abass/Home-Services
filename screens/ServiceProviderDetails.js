import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import Button from "../components/ui/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../constants/styles";
import { RotateInDownRight } from "react-native-reanimated";

/* 
    issue -> One service can't be booked twice
    one create a boolean booked value in each service provider,
    two handle if someone click's on the book now btn two times same service should not be booked twice
*/

const ServiceProviderDetails = ({ route, navigation }) => {
  const { image, provider, service, serviceName } = route.params;

  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />

        <View style={styles.details}>
          <Text style={styles.servName}> {service}</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}> {provider.name}</Text>
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
                (6,589 Reviews)
              </Text>
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.servCategory}> {serviceName ?? "Get Now"}</Text>
            <Text style={styles.contact}>
              <Ionicons
                name="call-outline"
                size={23}
                color="black"
                style={{
                  padding: 3,
                  paddingRight: 9,
                }}
              />
              {provider.contact}
            </Text>
          </View>
          <Text style={styles.price}>
            ${provider.price}
            <Text
              style={{
                fontSize: 15,
                color: "black",
                fontWeight: "300",
              }}
            >
              {" "}
              ({service} Price)
            </Text>
          </Text>
          <View
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginTop: 5,
            }}
          />

          <View>
            <Text style={styles.about}>About </Text>
            <Text
              style={{ fontSize: 16, letterSpacing: 0.489, lineHeight: 20 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at
              risus at risus lacinia tincidunt. Vivamus diam mauris, suscipit
              elementum turpis ac, elementum venenatis enim.
            </Text>
          </View>
        </View>
        {/* <Text> Need to show the reviews and photos  as well</Text> */}

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
        >
          <Button
            onPress={() =>
              navigation.navigate("ConfirmationScreen", { provider })
            }
            style={styles.button}
          >
            Book Now
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    // marginTop: -20,
  },
  button: {
    width: 100,
    marginHorizontal: 50,
  },

  details: {
    padding: 20,
    paddingBottom: 0,
  },
  servName: {
    fontSize: 27,
    fontWeight: "600",
  },

  nameContainer: {
    flexDirection: "row",
    paddingVertical: 7,
  },
  name: {
    fontSize: 19,
    fontWeight: "500",
  },
  rating: {
    paddingLeft: 4,
    color: "#FF9529",
    flex: 1,
    fontWeight: "bold",
    fontSize: 15,
  },
  servCategory: {
    fontSize: 17,
    fontWeight: "bold",
    elevation: 4,
    backgroundColor: "white",
    width: 88,
    // backfaceVisibility: "hidden",
    opacity: 0.9,
    // textAlign: "center",
    padding: 4,
    borderRadius: 10,
    marginRight: 30,
  },
  contact: {
    fontSize: 18,
    marginTop: 4,
    fontWeight: "500",
  },

  price: {
    fontSize: 27,
    color: "green",
    marginTop: 7,
  },

  about: {
    fontSize: 22,
    fontWeight: "500",
    paddingVertical: 6,
  },
});

export default ServiceProviderDetails;
