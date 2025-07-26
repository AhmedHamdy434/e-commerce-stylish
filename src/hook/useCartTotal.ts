import { useMemo } from "react";
import { CartItem } from "../context/UserDataContext";
import { ProductType } from "../firebase/firestore";

export const useCartTotal = (
  products: ProductType[] | null = [],
  cart: CartItem[]
) => {
  return useMemo(() => {
    if (products === null) return 0;
    return products.reduce((sum, product) => {
      const item = cart.find((c) => c.id === product.id);
      return sum + product.newPrice * (item?.quantity ?? 1);
    }, 0);
  }, [products, cart]);
};
