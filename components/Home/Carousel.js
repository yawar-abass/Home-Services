import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import SliderItem from "./SliderItem";

const MainSlider = () => {
  const data = [
    {
      title: "Revamp Your Home, Save Big",
      desc: "Unbeatable Limited Time Offer!",
      bgImage: require("../../assets/services/banner1.png"),
    },
    {
      title: "HomeCare Made Simple",
      desc: "Efficient Solutions for Everything",
      bgImage: require("../../assets/services/banner2.jpg"),
    },
    {
      title: "Expert Service Solutions",
      desc: "Skilled, Quick Solutions",
      bgImage: require("../../assets/services/banner3.jpeg"),
    },
  ];

  const width = Dimensions.get("window").width;
  return (
    <View style={styles.contianer}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        autoPlayInterval={5000}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <SliderItem
            title={item.title}
            desc={item.desc}
            bgImage={item.bgImage}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    marginRight: 34,
    marginLeft: 20,
  },
});

export default MainSlider;
