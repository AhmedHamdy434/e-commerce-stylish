import { FlatList, StyleSheet } from "react-native";
import { ProductType } from "../../firebase/firestore";
import CartCard from "./CartCard";
import { CartItem } from "../../context/UserDataContext";

const ShoppingList = ({
  products,
  cart,
}: {
  products: ProductType[];
  cart: CartItem[];
}) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 14, paddingBottom: 20 }}
      renderItem={({ item }) => {
        const cartItem = cart.find((c) => c.id === item.id);
        return (
          <CartCard
            product={item}
            quantity={cartItem?.quantity ?? 1}
            size={cartItem?.size ?? item.sizes[0]}
          />
        );
      }}
    />
  );
};

export default ShoppingList;

const styles = StyleSheet.create({});
