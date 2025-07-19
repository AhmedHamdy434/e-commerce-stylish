import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { ProductType } from "../firebase/firestore";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import Star from "./Star";

const ProductCard = ({
  product,
  isDeal = false,
  isTrend = false,
  isSearch = false,
}: {
  product: ProductType;
  isDeal?: boolean;
  isTrend?: boolean;
  isSearch?: boolean;
}) => {
  const {
    title,
    mainImage,
    description,
    newPrice,
    oldPrice,
    discount,
    rate,
    views,
  } = product;
  const { width } = useWindowDimensions();
  return (
    <View
      style={[
        styles.container,
        {
          width: isSearch ? (width - 48) / 2 : isDeal ? 170 : 142,
          borderRadius: isSearch ? 8 : 4,
        },
      ]}
    >
      <View style={{ height: isDeal ? 124 : isTrend ? 100 : 200 }}>
        <Image src={mainImage} resizeMode="cover" style={styles.image} />
      </View>
      <View style={[styles.textSection, { padding: isSearch ? 8 : 4 }]}>
        <Text
          style={[
            styles.title,
            { fontSize: isSearch ? SIZES.medium + 2 : SIZES.small + 2 },
          ]}
        >
          {title}
        </Text>
        {!isTrend && <Text style={styles.description}>{description}</Text>}
        <Text style={styles.newPrice}>{newPrice}$</Text>
        <View style={styles.discountContainer}>
          <Text style={styles.oldPrice}>{oldPrice}$</Text>
          <Text style={styles.discount}>{discount}% Off</Text>
        </View>
        {!isTrend && (
          <View style={styles.discountContainer}>
            <Star rate={rate} />
            <Text style={styles.views}>{views}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    height: 124,
  },
  image: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  textSection: {
    color: COLORS.black,
    gap: 4,
  },
  title: {
    fontFamily: FONTS.medium,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
  },
  newPrice: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.small + 2,
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  oldPrice: {
    fontFamily: FONTS.light,
    fontSize: SIZES.small + 2,
    color: COLORS.gray4,
    textDecorationLine: "line-through",
  },
  discount: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.main3,
  },
  views: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.view,
  },
});
