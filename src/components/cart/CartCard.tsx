import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { Image } from "react-native";
import { ProductType } from "../../firebase/firestore";
import Sizes from "../product/Sizes";
import Number from "./Number";

const CartCard = ({
  product,
  quantity,
  size,
}: {
  product: ProductType;
  quantity: number;
  size: string;
}) => {
  const { mainImage, title, sizes, id, newPrice } = product;

  return (
    <View style={styles.container}>
      <View style={styles.imageTextContainer}>
        <View style={styles.imageContainer}>
          <Image src={mainImage} resizeMode="cover" style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Sizes sizes={sizes} selectedSize={size} id={id} />
          <Number id={id} size={size} quantity={quantity} />
          <View style={styles.price}>
            <Text style={styles.priceText}>{newPrice} $</Text>
          </View>
        </View>
      </View>
      <View style={{ borderBottomColor: COLORS.gray4, borderBottomWidth: 1 }} />
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total Order : ({quantity})</Text>
        <Text style={styles.totalPrice}>{newPrice * quantity} $</Text>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    elevation: 5,
    padding: 10,
    borderRadius: 6,
    backgroundColor: COLORS.white,
  },
  card: {},
  imageTextContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  imageContainer: {
    width: 130,
    height: 125,
  },
  image: {
    borderRadius: 6,
    width: "100%",
    height: "100%",
  },
  textContainer: {
    gap: 8,
  },
  title: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  price: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  priceText: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium + 2,
    color: COLORS.black,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  total: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.small + 2,
    color: COLORS.black,
  },
  totalPrice: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.small + 2,
    color: COLORS.black,
  },
});
