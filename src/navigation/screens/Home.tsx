import {
  StyleSheet,
  // TouchableOpacity,
  // Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { logout } from "../../firebase/authFunctions";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../../components/NavBar";
import CategoryList from "../../components/home/CategoryList";
import { COLORS } from "../../constants/theme";
import DealOfDay from "../../components/home/DealOfDay";
import SliderHomeAd from "../../components/home/SliderHomeAd";
import SpecialBanner from "../../components/home/SpecialBanner";
import TrendingProducts from "../../components/home/TrendingProducts";

export function Home() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollContainer}
      >
        <NavBar />
        <CategoryList />\
        <SliderHomeAd />
        <DealOfDay />
        <SpecialBanner />
        <TrendingProducts />
        {/* <TouchableOpacity onPress={handleLogout}>
          <Text>Log out</Text>
        </TouchableOpacity> */}
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
    paddingTop: 40,
    gap: 16,
    alignItems: "center",
    paddingBottom: 24,
  },
});
