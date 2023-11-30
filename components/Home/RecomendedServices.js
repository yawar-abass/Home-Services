import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors, globalStyle } from "../../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RecomendedServices = ({ serviceProviders, providerImages }) => {
  const width = Dimensions.get("window").width;
  const navigation = useNavigation();

  // console.log(serviceProviders);

  // const service = serviceName.toLowerCase();
  return (
    <>
      <Text style={[globalStyle.title, { paddingLeft: 20 }]}>
        Most booked services
      </Text>

      <ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 12 }}
      >
        {serviceProviders && serviceProviders.length > 0 ? (
          serviceProviders.slice(0, 3).map((provider, i) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("ServiceProviderDetails", {
                    provider: provider,
                    image: providerImages[provider.name],
                  })
                }
                key={i}
                style={styles.card}
              >
                <View style={styles.serviceCard} key={i}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: providerImages[provider.name],
                    }}
                  />
                  <Text style={styles.servName}>
                    {provider.cleaning ??
                      provider.plumbing ??
                      provider.painting ??
                      provider.repairing ??
                      "Cleaning"}
                  </Text>
                  <Text style={styles.servProvd}>{provider.name}</Text>
                  <Text style={styles.rating}>
                    <Ionicons
                      name="star"
                      size={19}
                      color="gold"
                      style={{ padding: 3, paddingRight: 8 }}
                    />
                    {provider.rating}
                    {"  "}
                    <Text style={{ color: Colors.primary500 }}>
                      (110 Reviews)
                    </Text>
                  </Text>

                  <Text style={styles.price}>${provider.price}</Text>
                </View>
              </Pressable>
            );
          })
        ) : (
          <View>
            <Text>These Services can't be provided at your location</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 110,
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
