import { useRef } from "react";
import { StyleSheet, Image, View } from "react-native";
import Swiper from "react-native-swiper";
import { COLORS } from "../constants/theme";
import ImageWithLoading from "./ImageWithLoading";

const Slider = ({
  slides,
  heightOfImage,
}: {
  slides: { key: string; image: any }[];
  heightOfImage: number;
}) => {
  const swiperRef = useRef<Swiper | null>(null);

  return (
    <Swiper
      ref={swiperRef}
      loop
      showsPagination={true}
      dotColor={COLORS.dark}
      dotStyle={{ opacity: 0.2 }}
      activeDotColor={COLORS.main}
      activeDotStyle={{ opacity: 1 }}
      paginationStyle={{ gap: 5, position: "relative", top: 1 }}
      height={heightOfImage + 10}
    >
      {slides.map((slide, i) => (
        <View key={slide.key} style={[styles.slide, { height: heightOfImage }]}>
          <ImageWithLoading image={slide.image} />
        </View>
      ))}
    </Swiper>
  );
};

export default Slider;

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 16,
  },
});
