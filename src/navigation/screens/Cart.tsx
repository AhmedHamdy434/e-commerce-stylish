import { getProductsByIds, ProductType } from "../../firebase/firestore";
import { useUserData } from "../../context/UserDataContext";
import Loading from "../../components/Loading";
import { useFetch } from "../../hook/useFetch";
import { NotFound } from "./NotFound";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Address from "../../components/cart/Address";

const Cart = () => {
  const { cart } = useUserData();
  const {
    data: products,
    loading,
    error,
  } = useFetch<ProductType[]>(() => getProductsByIds(cart));

  if (loading) return <Loading />;
  if (!products || error) return <NotFound />;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headContainer}>
        <Text>Cart</Text>
      </View>
      <View style={{ paddingHorizontal: 16, width: "100%" }}>
        <Address />
      </View>
      {/* <>
            {!handleFilterChange && (
              <View style={styles.headContainer}>
                <Text style={styles.title}>{products.length} items</Text>
              </View>
            )}
            {handleFilterChange && (
              <FilterAndSort
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
          </> */}
    </SafeAreaView>
  );
};

export default Cart;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.bg,
    gap: 16,
    alignItems: "center",
    paddingBottom: 24,
  },
  headContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
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
