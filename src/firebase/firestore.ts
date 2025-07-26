import {
  collection,
  setDoc,
  doc,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./firebaseConfig";
export type ProductType = {
  id: string;
  description: string;
  details: string;
  mainImage: string;
  images: string[];
  category: string;
  newPrice: number;
  oldPrice: number;
  discount: number;
  rate: number;
  sizes: string[];
  title: string;
  views: number;
};
export type SortOption =
  | "priceAsc"
  | "priceDesc"
  | "discount"
  | "views"
  | "rate";

export const getProductById = async (id: string): Promise<ProductType> => {
  try {
    const productRef = doc(firestore, "products", id);
    const snapshot = await getDoc(productRef);
    if (!snapshot.exists()) {
      throw new Error("Product not found");
    }
    return snapshot.data() as ProductType;
  } catch (error) {
    throw new Error("Product not found");
  }
};
export const getProductsByIds = async (
  ids: string[]
): Promise<ProductType[]> => {
  try {
    const productPromises = ids.map(async (id) => {
      const ref = doc(firestore, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        return snap.data() as ProductType;
      }
      return [];
    });

    const results = await Promise.all(productPromises);
    return results.filter(
      (product): product is ProductType => product !== null
    );
  } catch (error) {
    console.error("Error getting products by IDs:", error);
    return [];
  }
};

export const getMostViewed = async (n: number) => {
  const q = query(
    collection(firestore, "products"),
    orderBy("views", "desc"),
    limit(n)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data()) as ProductType[];
};

export const filterByCategory = async (category: string) => {
  const q = query(
    collection(firestore, "products"),
    where("category", "==", category)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

export const getMostDiscount = async (n: number) => {
  const q = query(
    collection(firestore, "products"),
    orderBy("discount", "desc"),
    limit(n)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data()) as ProductType[];
};

export const searchFilterSortProducts = async ({
  keyword = "",
  category = "",
  sortBy,
  limitCount,
}: {
  keyword?: string;
  category?: string;
  sortBy?: SortOption;
  limitCount?: number;
}): Promise<ProductType[]> => {
  try {
    let q = collection(firestore, "products");

    const constraints: any[] = [];

    if (category) {
      constraints.push(where("category", "==", category));
    }

    if (sortBy === "priceAsc") constraints.push(orderBy("newPrice", "asc"));
    else if (sortBy === "priceDesc")
      constraints.push(orderBy("newPrice", "desc"));
    else if (sortBy === "discount")
      constraints.push(orderBy("discount", "desc"));
    else if (sortBy === "views") constraints.push(orderBy("views", "desc"));
    else if (sortBy === "rate") constraints.push(orderBy("rate", "desc"));

    if (limitCount) constraints.push(limit(limitCount));

    const snapshot = await getDocs(query(q, ...constraints));
    let products = snapshot.docs.map((doc) => doc.data() as ProductType);

    if (keyword) {
      const keywordLower = keyword.toLowerCase();
      products = products.filter((p) =>
        p.title.toLowerCase().includes(keywordLower)
      );
    }

    return products;
  } catch (error) {
    console.error("Error in searchFilterSortProducts:", error);
    return [];
  }
};
