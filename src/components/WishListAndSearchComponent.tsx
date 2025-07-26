import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  StatusBar,
} from "react-native";
import NavBar from "./NavBar";
import FilterAndSort from "./search/FilterAndSort";
import ProductCard from "./ProductCard";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { ProductType } from "../firebase/firestore";

type FunctionSearchType = {
  products: ProductType[];
  handleFilterChange?: ({
    keyword,
    category,
    sortBy,
  }: {
    keyword: string;
    category: string;
    sortBy: any;
  }) => void;
  filter?: string;
};

const WishListAndSearchComponent = ({
  products,
  handleFilterChange,
  filter,
}: FunctionSearchType) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollContainer}
      >
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <NavBar />
        <>
          {!handleFilterChange && (
            <View style={styles.headContainer}>
              <Text style={styles.title}>{products.length} items</Text>
            </View>
          )}
          {handleFilterChange && (
            <FilterAndSort
              initial={filter?.toLocaleLowerCase()}
              onFilterChange={handleFilterChange}
              lengthOfSearch={products.length}
            />
          )}
          {products.length === 0 ? (
            <View style={styles.noProductContainer}>
              <Text style={styles.noProduct}>There are no Products</Text>
            </View>
          ) : (
            <View style={styles.mapping}>
              {products.map((product) => (
                <ProductCard isSearch key={product.title} product={product} />
              ))}
            </View>
          )}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishListAndSearchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContainer: {
    gap: 16,
    alignItems: "center",
    paddingBottom: 24,
  },
  headContainer: {
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
  },
  mapping: {
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  noProductContainer: {
    marginTop: 100,
  },
  noProduct: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    textAlign: "center",
  },
});
