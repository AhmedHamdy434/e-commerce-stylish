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
} from "../firebase/firestoreUser";

const UserDataContext = createContext<UserDataContextType | null>(null);

type UserDataContextType = {
  favorites: string[];
  cart: string[];
  handleAddToFavorites: (productId: string) => Promise<void>;
  handleRemoveFromFavorites: (productId: string) => Promise<void>;
  handleAddToCart: (productId: string) => Promise<void>;
  handleRemoveFromCart: (productId: string) => Promise<void>;
  handleDecreaseCart: (productId: string) => Promise<void>;
  fetchFavorites: () => Promise<void>;
  fetchCart: () => Promise<void>;
};

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

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

  const handleAddToCart = async (productId: string) => {
    await addToCart(productId);
    if (!cart.includes(productId)) {
      setCart((prev) => [...prev, productId]);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    await removeFromCart(productId);
    setCart((prev) => prev.filter((id) => id !== productId));
  };

  const handleDecreaseCart = async (productId: string) => {
    await decreaseCartQuantity(productId);
    // optional: re-fetch or assume the item is still there
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
