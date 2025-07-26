import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  getCartItems,
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  updateCartItemSize,
} from "../firebase/firestoreUser";

const UserDataContext = createContext<UserDataContextType | null>(null);

type UserDataContextType = {
  favorites: string[];
  cart: CartItem[];
  handleAddToFavorites: (productId: string) => Promise<void>;
  handleRemoveFromFavorites: (productId: string) => Promise<void>;
  handleAddToCart: (productId: string, size: string) => Promise<void>;
  handleRemoveFromCart: (productId: string) => Promise<void>;
  handleDecreaseCart: (productId: string) => Promise<void>;
  fetchFavorites: () => Promise<void>;
  fetchCart: () => Promise<void>;
  updateCartSize: (productId: string, newSize: string) => Promise<void>;
};
export type CartItem = {
  id: string;
  quantity: number;
  size: string | null;
};

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Fetch on mount
  useEffect(() => {
    fetchFavorites();
    fetchCart();
  }, []);

  const fetchFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const fetchCart = async () => {
    const cartItems = await getCartItems();
    setCart(cartItems);
  };

  // Wrapper to sync Firestore + local state
  const handleAddToFavorites = async (productId: string) => {
    await addToFavorites(productId);
    setFavorites((prev) => [...prev, productId]);
  };

  const handleRemoveFromFavorites = async (productId: string) => {
    await removeFromFavorites(productId);
    setFavorites((prev) => prev.filter((id) => id !== productId));
  };
  const handleAddToCart = async (productId: string, size: string) => {
    await addToCart(productId, size);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        // update quantity and size if needed
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1, size }
            : item
        );
      } else {
        return [...prev, { id: productId, quantity: 1, size }];
      }
    });
  };

  const handleRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleDecreaseCart = async (productId: string) => {
    await decreaseCartQuantity(productId);

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (!existing) return prev;

      if (existing.quantity > 1) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // remove item if quantity becomes 0
        return prev.filter((item) => item.id !== productId);
      }
    });
  };

  const updateCartSize = async (productId: string, newSize: string) => {
    await updateCartItemSize(productId, newSize);

    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, size: newSize } : item
      )
    );
  };

  return (
    <UserDataContext.Provider
      value={{
        favorites,
        cart,
        handleAddToFavorites,
        handleRemoveFromFavorites,
        handleAddToCart,
        handleRemoveFromCart,
        handleDecreaseCart,
        fetchFavorites,
        fetchCart,
        updateCartSize,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
