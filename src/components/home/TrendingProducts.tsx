import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getMostViewed, ProductType } from "../../firebase/firestore";
import ProductCard from "../ProductCard";
import ColoredBanner from "./ColoredBanner";

const TrendingProducts = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const products = await getMostViewed(5);
      setProducts(products as ProductType[]);
    };
    getProducts();
  }, []);
  return (
    <>
      <ColoredBanner isBlue={false} />
      {products && (
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
          renderItem={({ item }) => <ProductCard product={item} isTrend />}
        />
      )}
    </>
  );
};

export default TrendingProducts;
