import { FlatList, View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getMostViewed, ProductType } from "../../firebase/firestore";
import ProductCard from "../ProductCard";
import ColoredBanner from "./ColoredBanner";
import { useFetch } from "../../hook/useFetch";
import Loading from "../Loading";
import { COLORS, FONTS } from "../../constants/theme";

const TrendingProducts = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch<ProductType[]>(() => getMostViewed(5));

  return (
    <>
      <ColoredBanner isBlue={false} />
      {loading ? (
        <View style={{ width: "100%", height: 200 }}>
          <Loading />
        </View>
      ) : error ? (
        <View style={{ width: "100%", height: 200 }}>
          <Text
            style={{
              color: COLORS.main,
              fontFamily: FONTS.bold,
              textAlign: "center",
            }}
          >
            Failed to load deals
          </Text>
        </View>
      ) : (
        products && (
          <FlatList
            data={products}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
            renderItem={({ item }) => <ProductCard product={item} isTrend />}
          />
        )
      )}
    </>
  );
};

export default TrendingProducts;
