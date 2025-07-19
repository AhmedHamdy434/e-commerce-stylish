import { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Swiper from "react-native-swiper";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const slides = [
  {
    key: "slide1",
    title: "Choose Products",
    text: "Find your favorite items at the best price.",
    image: require("../../assets/onboard/onboard-1.png"),
  },
  {
    key: "slide2",
    title: "Make Payment",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    image: require("../../assets/onboard/onboard-2.png"),
  },
  {
    key: "slide3",
    title: "Track Orders",
    text: "Get updates on delivery status instantly.",
    image: require("../../assets/onboard/onboard-3.png"),
  },
];

export default function OnboardingSwiper({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const swiperRef = useRef<Swiper | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SafeAreaView style={styles.wrapper}>
      {/* Header: Progress + Skip */}
      <View style={styles.topBar}>
        <Text style={styles.counter}>
          {currentIndex + 1}
          <Text style={{ color: COLORS.gray }}>/{slides.length}</Text>
        </Text>
        <TouchableOpacity onPress={onFinish}>
          <Text style={styles.counter}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        onIndexChanged={(index) => setCurrentIndex(index)}
      >
        {slides.map((slide, i) => (
          <View key={slide.key} style={styles.slide}>
            <Image
              source={slide.image}
              style={[
                styles.image,
                i === 0
                  ? { height: 300 }
                  : i === 1
                  ? { height: 235 }
                  : { height: 350 },
              ]}
            />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.text}>{slide.text}</Text>
          </View>
        ))}
      </Swiper>

      {/* Pagination + Buttons */}
      <View style={styles.bottomBar}>
        {/* prev button  */}
        <TouchableOpacity
          onPress={() => swiperRef.current?.scrollBy(-1)}
          disabled={currentIndex === 0}
        >
          <Text style={[styles.navText, currentIndex === 0 && styles.disabled]}>
            Prev
          </Text>
        </TouchableOpacity>

        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i ? styles.activeDot : null]}
            />
          ))}
        </View>

        {/* Buttons */}

        <TouchableOpacity
          onPress={
            currentIndex === slides.length - 1
              ? onFinish
              : () => swiperRef.current?.scrollBy(1)
          }
        >
          <Text style={[styles.navText, styles.next]}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.white },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.xLarge,
    paddingTop: 50,
  },
  counter: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: SIZES.xLarge,
  },
  image: {
    width: "100%",
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONTS.exBold,
    marginBottom: SIZES.small,
    textAlign: "center",
  },
  text: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    color: COLORS.text2,
    textAlign: "center",
    lineHeight: SIZES.xLarge,
    paddingHorizontal: 18,
  },

  bottomBar: {
    flexDirection: "row",
    paddingBottom: 22,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: SIZES.small,
    height: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.dark,
    opacity: 0.2,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 40,
    opacity: 1,
  },
  navText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.gray2,
  },
  next: {
    color: COLORS.main,
  },
  disabled: {
    opacity: 0,
  },
});
