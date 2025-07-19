import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const SpecialBanner = () => {
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/Special.png")}
          style={styles.image}
        />
        <View>
          <Text style={styles.head}>Special Offers</Text>
          <Text style={styles.paragraph}>
            We make sure you get the
            {"\n"}
            offer you need at best prices
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SpecialBanner;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  image: {
    width: 75,
    height: 60,
  },
  head: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium + 2,
    marginBottom: 8,
  },
  paragraph: {
    fontFamily: FONTS.light,
    fontSize: SIZES.small + 2,
  },
});
