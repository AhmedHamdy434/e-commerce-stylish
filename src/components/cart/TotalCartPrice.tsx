import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const TotalCartPrice = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.total}>{totalPrice} $</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TotalCartPrice;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 32,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    width: "100%",
    backgroundColor: COLORS.bg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#979797",
    borderWidth: 0.5,
  },
  total: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium + 2,
    color: COLORS.black,
  },
  button: {
    paddingHorizontal: 21,
    paddingVertical: 14,
    borderRadius: 5,
    backgroundColor: COLORS.main,
  },
  text: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
});
