import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import NavBar from "../../components/NavBar";
import CategoryList from "../../components/home/CategoryList";
import { COLORS } from "../../constants/theme";
import DealOfDay from "../../components/home/DealOfDay";
import Slider from "../../components/Slider";
import SpecialBanner from "../../components/home/SpecialBanner";
import TrendingProducts from "../../components/home/TrendingProducts";

export function Home() {
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
      >
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <NavBar />
        <CategoryList />
        <Slider slides={slides} heightOfImage={180} />
        <DealOfDay />
        <SpecialBanner />
        <TrendingProducts />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContainer: {
    gap: 16,
    alignItems: "center",
    paddingBottom: 24,
  },
});
