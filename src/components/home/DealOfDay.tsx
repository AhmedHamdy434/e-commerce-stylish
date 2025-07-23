import { FlatList, View, Text } from "react-native";
import { getMostDiscount, ProductType } from "../../firebase/firestore";
import ProductCard from "../ProductCard";
import ColoredBanner from "./ColoredBanner";
import { useFetch } from "../../hook/useFetch";
import Loading from "../Loading";
import { COLORS, FONTS } from "../../constants/theme";

const DealOfDay = () => {
  const {
    data: products,
    loading,
    error,
  } = useFetch<ProductType[]>(() => getMostDiscount(5));

  return (
    <>
      <ColoredBanner isBlue />
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
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            renderItem={({ item }) => <ProductCard product={item} isDeal />}
          />
        )
      )}
    </>
  );
};

export default DealOfDay;
