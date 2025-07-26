import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { EvilIcons, FontAwesome6 } from "@expo/vector-icons";

const Address = () => {
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.headContainer}>
        <EvilIcons name="location" size={16} color={COLORS.black} />
        <Text style={styles.head}>Delivery Address</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.edit}>
          <FontAwesome6 name="edit" size={12} color={COLORS.black} />
        </View>
        <Text style={styles.addressHead}>
          Address: 216 St Paul's Rd, London N1 2LL, UK
        </Text>
        <Text style={styles.addressHead}>Contact: 01120713673</Text>
      </View>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  headContainer: {
    paddingBottom: 10,
    paddingTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: 8,
  },
  head: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },
  box: {
    position: "relative",
    padding: 24,
    borderRadius: 8,
    elevation: 5,
  },
  edit: {
    position: "absolute",
    end: 16,
    top: 16,
  },
  addressHead: {
    fontSize: SIZES.small + 2,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    marginBottom: 4,
  },
});
