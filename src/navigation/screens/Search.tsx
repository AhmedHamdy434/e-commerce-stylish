import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/theme";
import NavBar from "../../components/NavBar";
import FilterAndSort from "../../components/search/FilterAndSort";
import {
  ProductType,
  searchFilterSortProducts,
} from "../../firebase/firestore";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

const Search = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const handleFilterChange = async ({
    keyword,
    category,
    sortBy,
  }: {
    keyword: string;
    category: string;
    sortBy: any;
  }) => {
    const data = await searchFilterSortProducts({
      keyword,
      category,
      sortBy,
    });
    console.log("data", data.length);
    setProducts(data);
  };

  useEffect(() => {
    handleFilterChange({ keyword: "", category: "", sortBy: "" });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollContainer}
      >
        <NavBar />
        <FilterAndSort
          onFilterChange={handleFilterChange}
          lengthOfSearch={products.length}
        />
        <View style={styles.mapping}>
          {products.map((product) => (
            <ProductCard isSearch key={product.title} product={product} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContainer: {
    paddingTop: 40,
    gap: 16,
    alignItems: "center",
    paddingBottom: 24,
  },
  mapping: {
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});
