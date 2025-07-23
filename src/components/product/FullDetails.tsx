import { StyleSheet, Text, View } from "react-native";
import { ProductType } from "../../firebase/firestore";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Star from "../Star";

const FullDetails = ({ product }: { product: ProductType }) => {
  const {
    title,
    description,
    rate,
    views,
    newPrice,
    oldPrice,
    discount,
    details,
  } = product;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.rating}>
        <Star rate={rate} />
        <Text style={styles.views}>{views}</Text>
      </View>
      <View style={styles.rating}>
        <Text style={styles.oldPrice}>{oldPrice}$</Text>
        <Text style={styles.newPrice}>{newPrice}$</Text>
        <Text style={styles.discount}>{discount}% Off</Text>
      </View>
      <View style={{ gap: 4 }}>
        <Text style={styles.detailHead}>Product Details</Text>
        <Text style={styles.detail}>{details}</Text>
      </View>
    </View>
  );
};

export default FullDetails;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    gap: 8,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.large + 2,
    color: COLORS.black,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  views: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: "#828282",
  },
  oldPrice: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.medium,
    color: "#808488",
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  discount: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.main4,
  },
  detailHead: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  detail: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small + 2,
    color: COLORS.black,
    lineHeight: 16,
  },
});
