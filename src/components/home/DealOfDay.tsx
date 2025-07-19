import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getMostDiscount, ProductType } from "../../firebase/firestore";
import ProductCard from "../ProductCard";
import ColoredBanner from "./ColoredBanner";

const DealOfDay = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      const products = await getMostDiscount(5);
      setProducts(products as ProductType[]);
    };
    getProducts();
  }, []);
  return (
    <>
      <ColoredBanner isBlue />
      {products && (
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => <ProductCard product={item} isDeal />}
        />
      )}
    </>
  );
};

export default DealOfDay;
