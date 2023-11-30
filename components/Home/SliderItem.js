import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { Colors } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const SliderItem = ({ title, bgImage, desc }) => {
  const navigation = useNavigation();

  function bookNowhandler() {
    navigation.navigate("Services");
  }
  return (
    <View style={styles.card}>
      <ImageBackground
        source={bgImage}
        resizeMode="cover"
        imageStyle={{ borderRadius: 10 }}
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
          <Pressable
            onPress={bookNowhandler}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <View>
              <Text style={styles.buttonText}>Book now</Text>
            </View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 120,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginHorizontal: 13,
    marginTop: 4,
    marginBottom: 9,
    backgroundColor: Colors.support1,

    // elevation: 2,
    // shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    // borderWidth: 3,
    // borderColor: "blue",
    marginRight: 40,
    // height: 200,
    overflow: "hidden",
  },
  overlay: {
    height: 195,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingVertical: 22,
    borderRadius: 10,
  },
  text: {
    fontSize: 27,
    color: "white",
    paddingLeft: 13,
    paddingRight: 90,
    fontWeight: "600",
  },
  desc: {
    fontSize: 16,
    color: "lightgray",
    paddingVertical: 8,
    paddingHorizontal: 13,
    fontWeight: "500",
  },
  image: {
    // flex: 1,
    borderRadius: 20,
    justifyContent: "center",
  },
});

export default SliderItem;
