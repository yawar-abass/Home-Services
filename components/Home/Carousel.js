import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import SliderItem from "./SliderItem";

const MainSlider = () => {
  const data = [
    {
      title: "Laptop repair at your home",
      desc: "Repair at home",
      bgImage: require("../../assets/demo.png"),
    },
    {
      title: "Slider two content goes here",
      desc: "Repair at home",
      bgImage: require("../../assets/slider2.jpg"),
    },
    {
      title: "Slider three here",
      desc: "Repair at home",
      bgImage: require("../../assets/demo.png"),
    },
  ];

  const width = Dimensions.get("window").width;
  return (
    <View style={styles.contianer}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        // autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log("current index:", index)}
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
