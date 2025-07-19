import { useRef } from "react";
import { StyleSheet, Image, View } from "react-native";
import Swiper from "react-native-swiper";
import { COLORS, SIZES } from "../../constants/theme";

const SliderHomeAd = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const slides = [
    {
      key: "slide1",
      image: require("../../assets/home1.png"),
    },
    {
      key: "slide2",
      image: require("../../assets/home2.png"),
    },
    {
      key: "slide3",
      image: require("../../assets/home3.png"),
    },
  ];
  return (
    <Swiper
      ref={swiperRef}
      loop
      showsPagination={true}
      dotColor={COLORS.dark}
      dotStyle={{ opacity: 0.2 }}
      activeDotColor={COLORS.dark}
      activeDotStyle={{ opacity: 1 }}
      paginationStyle={{ gap: 5, position: "relative", top: 1 }}
      height={190}
    >
      {slides.map((slide, i) => (
        <View key={slide.key} style={styles.slide}>
          <Image source={slide.image} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

export default SliderHomeAd;

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 180,
  },
});
