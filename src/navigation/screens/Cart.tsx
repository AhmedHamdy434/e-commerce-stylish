import { getProductsByIds, ProductType } from "../../firebase/firestore";
import { useUserData } from "../../context/UserDataContext";
import Loading from "../../components/Loading";
import { useFetch } from "../../hook/useFetch";
import { NotFound } from "./NotFound";
import { StyleSheet, SafeAreaView, StatusBar, View, Text } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Address from "../../components/cart/Address";
import ShoppingList from "../../components/cart/ShoppingList";
import TotalCartPrice from "../../components/cart/TotalCartPrice";
import { useCartTotal } from "../../hook/useCartTotal";

const Cart = () => {
  const { cart } = useUserData();
  const productIds = cart.map((item) => item.id) ?? [];
  const {
    data: products,
    loading,
    error,
  } = useFetch<ProductType[]>(() => getProductsByIds(productIds));
  const totalPrice = useCartTotal(products, cart);
  if (loading) return <Loading />;
  if (!products || error) return <NotFound />;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={{ paddingHorizontal: 16, width: "100%", flex: 1 }}>
        <Address />
        <Text style={styles.header}>Shopping List</Text>
        <View style={{ flex: 1 }}>
          <ShoppingList products={products} cart={cart} />
        </View>
      </View>
      <TotalCartPrice totalPrice={totalPrice} />
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
  },
  header: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.black,
    paddingVertical: 10,
  },
});
