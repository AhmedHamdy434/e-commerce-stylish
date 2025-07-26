import { StyleSheet, Text, View } from "react-native";
import SpecialButtons from "./SpecialButtons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const AddToCartButtonContainer = ({
  id,
  sizes,
}: {
  id: string;
  sizes: string[];
}) => {
  return (
    <>
      <View style={styles.container}>
        <SpecialButtons isCart id={id} sizes={sizes} />
        <SpecialButtons isCart={false} id={id} />
      </View>
      <View style={styles.pinkContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Delivery in</Text>
          <Text style={styles.text2}>1 within Hour</Text>
        </View>
      </View>
    </>
  );
};

export default AddToCartButtonContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
  },
  pinkContainer: {
    borderRadius: 5,
    backgroundColor: "#ffccd5",
    padding: 11,
    paddingStart: 26,
  },
  textContainer: {
    gap: 6,
  },
  text1: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },
  text2: {
    fontSize: SIZES.large + 3,
    fontFamily: FONTS.semiBold,
    color: "#010101",
    lineHeight: SIZES.medium + 2,
  },
});
