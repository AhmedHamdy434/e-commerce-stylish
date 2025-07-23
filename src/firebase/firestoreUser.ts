import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "./firebaseConfig";

// ✅ Add to favorites
export const addToFavorites = async (productId: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(firestore, "users", userId, "favorites", productId);
  await setDoc(ref, { addedAt: new Date() });
};

// ✅ Remove from favorites
export const removeFromFavorites = async (productId: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(firestore, "users", userId, "favorites", productId);
  await deleteDoc(ref);
};
////  is in favourite
export const isInFavorites = async (productId: string): Promise<boolean> => {
  const userId = auth.currentUser?.uid;
  if (!userId) return false;

  const ref = doc(firestore, "users", userId, "favorites", productId);
  const snap = await getDoc(ref);
  return snap.exists();
};
// ✅ Get all favorites
export const getFavorites = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];

  const snapshot = await getDocs(
    collection(firestore, "users", userId, "favorites")
  );
  return snapshot.docs.map((doc) => doc.id);
};

/////////  cart
// ✅ Add to cart
export const addToCart = async (id: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(firestore, "users", userId, "cart", id);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    // increase quantity
    await updateDoc(ref, {
      quantity: existing.data().quantity + 1,
    });
  } else {
    await setDoc(ref, {
      quantity: 1,
      addedAt: new Date(),
    });
  }
};

// ✅ Remove from cart
export const removeFromCart = async (productId: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(firestore, "users", userId, "cart", productId);
  await deleteDoc(ref);
};
// ✅ decrease item from cart

export const decreaseCartQuantity = async (productId: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(firestore, "users", userId, "cart", productId);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const currentQty = docSnap.data().quantity;

    if (currentQty > 1) {
      await updateDoc(ref, {
        quantity: currentQty - 1,
      });
    } else {
      // Remove item if quantity becomes 0
      await deleteDoc(ref);
    }
  }
};

// ✅ Get all cart items
export const getCartItems = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];

  const snapshot = await getDocs(
    collection(firestore, "users", userId, "cart")
  );
  return snapshot.docs.map((doc) => doc.id);
};
////  is in cart
export const isInCart = async (productId: string): Promise<boolean> => {
  const userId = auth.currentUser?.uid;
  if (!userId) return false;

  const ref = doc(firestore, "users", userId, "cart", productId);
  const snap = await getDoc(ref);
  return snap.exists();
};
////// addresse
export const updateUserContactInfo = async (
  address: string,
  mobile: string
) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  const ref = doc(firestore, "users", userId);
  await setDoc(
    ref,
    {
      address,
      mobile,
    },
    { merge: true }
  );
};

export const getUserContactInfo = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return null;

  const ref = doc(firestore, "users", userId);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    return docSnap.data() as { address: string; mobile: string };
  }

  return null;
};
