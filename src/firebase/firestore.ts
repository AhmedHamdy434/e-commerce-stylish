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

const products = [
  {
    id: "01",
    description: "Official 2025 Al-Ahly football shirt in premium quality.",
    details:
      "The 2025 Al-Ahly shirt is crafted from high-performance, breathable fabric that ensures all-day comfort. It features the club’s signature red color with a modern, athletic fit and embroidered team crest. Designed for both fans and athletes, it delivers style and function whether you're on the pitch or in the stands. The moisture-wicking technology keeps you cool and dry. It’s a must-have for true supporters looking to show off their team pride in a bold and stylish way.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726867/al-ahly1_u7o2gr.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726867/al-ahly1_u7o2gr.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726868/al-ahly2_r6jsf1.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726870/al-ahly3_rt2qsn.avif",
    ],
    category: "men",
    newPrice: 2950,
    oldPrice: 3299,
    discount: 11,
    rate: 4,
    sizes: ["xl", "2xl", "3xl"],
    title: "Al-Ahly 2025 Football Shirt",
    views: 2234,
  },

  {
    id: "02",
    description: "Classic fit men's white cotton shirt for everyday wear.",
    details:
      "This premium cotton shirt is soft, breathable, and perfect for both casual and semi-formal settings. Designed with a relaxed fit and durable stitching, it delivers comfort with timeless style. Pair it with jeans or dress pants for a versatile look.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726877/manshirt1_jbh4t7.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726877/manshirt1_jbh4t7.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726888/manshirt2_sascew.jpg",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726884/manshirt3_ikbkhf.avif",
    ],
    category: "men",
    newPrice: 799,
    oldPrice: 999,
    discount: 20,
    rate: 4.5,
    sizes: ["m", "l", "xl"],
    title: "Men’s Cotton White Shirt",
    views: 1467,
  },
  {
    id: "03",
    description: "Comfortable men's grey jogger pants with tapered legs.",
    details:
      "Made from a soft cotton blend, these jogger pants offer maximum flexibility for workouts or lounging. The elastic waistband and adjustable drawstring provide a perfect fit, while the tapered leg adds a modern touch.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726875/manleg1_emy5ux.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726875/manleg1_emy5ux.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726885/manleg2_wzh124.avif",
    ],
    category: "men",
    newPrice: 650,
    oldPrice: 749,
    discount: 13,
    rate: 4.2,
    sizes: ["m", "l", "xl", "2xl"],
    title: "Men’s Grey Joggers",
    views: 985,
  },
  {
    id: "04",
    description: "Casual men's black t-shirt with round neck.",
    details:
      "This versatile black t-shirt is made from soft, breathable fabric, suitable for daily wear. The crew neck design and modern fit make it a great addition to any wardrobe. Ideal for layering or wearing solo.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726872/manblack1_atkkjd.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726872/manblack1_atkkjd.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726873/manblack2_b3hcmn.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726882/manblack3_tfbdc7.avif",
    ],
    category: "men",
    newPrice: 299,
    oldPrice: 399,
    discount: 25,
    rate: 4.6,
    sizes: ["s", "m", "l", "xl"],
    title: "Men’s Black T-Shirt",
    views: 812,
  },
  {
    id: "05",
    description: "Men’s full-zip sports hoodie with soft fleece lining.",
    details:
      "Ideal for training and casual wear, this full-zip hoodie features a warm fleece interior, drawstring hood, and kangaroo pockets. It’s designed for movement, breathability, and all-season layering.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726884/manhoody1_yz5dpl.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726884/manhoody1_yz5dpl.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726876/manhoody2_nmjekf.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726881/manhoody3_oqwwfh.avif",
    ],
    category: "men",
    newPrice: 1200,
    oldPrice: 1499,
    discount: 20,
    rate: 4.4,
    sizes: ["m", "l", "xl"],
    title: "Men’s Sports Hoodie",
    views: 1073,
  },
  {
    id: "06",
    description: "Elegant women's long floral dress for summer outings.",
    details:
      "Crafted with lightweight fabric and a flattering silhouette, this floral dress is perfect for warm days. The dress features a V-neck, flowing skirt, and short sleeves for a chic yet comfortable look.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726891/womandress1_bvuf3o.jpg",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726891/womandress1_bvuf3o.jpg",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726889/womandress2_yhdebo.jpg",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726891/womandress3_pd8rzt.jpg",
    ],
    category: "women",
    newPrice: 1150,
    oldPrice: 1399,
    discount: 18,
    rate: 4.7,
    sizes: ["s", "m", "l"],
    title: "Women’s Floral Summer Dress",
    views: 2314,
  },
  {
    id: "07",
    description: "Women's high-waisted skinny jeans in classic blue.",
    details:
      "These stretch-fit skinny jeans feature a flattering high-rise waist and durable denim. Great for both casual and dressed-up looks. Designed to hug your curves and keep their shape all day.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726893/womanjeans1_tcr2u7.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726893/womanjeans1_tcr2u7.avif",
    ],
    category: "women",
    newPrice: 890,
    oldPrice: 1099,
    discount: 19,
    rate: 4.3,
    sizes: ["s", "m", "l", "xl"],
    title: "Women’s Skinny Jeans",
    views: 1785,
  },
  {
    id: "08",
    description: "Soft pink women’s hoodie with front pocket.",
    details:
      "A cozy and stylish hoodie designed for ultimate comfort. Made from a cotton-blend fabric, it features ribbed cuffs, drawstring hood, and a kangaroo pocket for added convenience.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726888/womanhoody1_yf2dul.jpg",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726888/womanhoody1_yf2dul.jpg",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726887/womanhoody2_ww2fav.jpg",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752726888/womanhoody3_t6l2qn.jpg",
    ],
    category: "women",
    newPrice: 730,
    oldPrice: 899,
    discount: 19,
    rate: 4.6,
    sizes: ["m", "l", "xl"],
    title: "Women’s Pink Hoodie",
    views: 1210,
  },
  {
    id: "09",
    description: "Women’s Blazer Jacket made from premium quality materials.",
    details:
      "This women’s blazer jacket provides comfort, durability, and a modern look. Perfect for daily wear or special occasions.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767229/womenblazer1_zimyru.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767229/womenblazer1_zimyru.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767240/womenblazer2_q09mzm.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767231/womenblazer3_tolw2s.avif",
    ],
    category: "women",
    newPrice: 520,
    oldPrice: 649,
    discount: 20,
    rate: 4.5,
    sizes: ["s", "m", "l"],
    title: "Women’s Blazer Jacket",
    views: 998,
  },
  {
    id: "10",
    description: "Stylish women’s denim jacket with button front.",
    details:
      "A timeless piece, this denim jacket adds effortless style to any outfit. Crafted from premium cotton with a structured fit, it’s perfect for layering year-round.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767250/womenjacket1_mjhysj.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767250/womenjacket1_mjhysj.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767259/womenjacket2_xuz8rm.avif",
    ],
    category: "women",
    newPrice: 950,
    oldPrice: 1149,
    discount: 17,
    rate: 4.6,
    sizes: ["s", "m", "l", "xl"],
    title: "Women’s Denim Jacket",
    views: 1345,
  },
  {
    id: "11",
    description: "Kids' cotton t-shirt with cartoon print.",
    details:
      "Fun and colorful, this t-shirt features a soft feel and adorable cartoon design. It’s gentle on kids' skin and perfect for everyday wear, playdates, or school.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767234/kidssimpa1_vnfyjs.webp",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767234/kidssimpa1_vnfyjs.webp",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767213/kidssimpa2_mngmgm.webp",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767215/kidssimpa3_gwm4az.webp",
    ],
    category: "kids",
    newPrice: 199,
    oldPrice: 299,
    discount: 33,
    rate: 4.8,
    sizes: ["3-4y", "5-6y", "7-8y"],
    title: "Kids’ Cartoon T-Shirt",
    views: 1478,
  },
  {
    id: "12",
    description: "Comfy kids' hoodie with zipper front.",
    details:
      "This soft hoodie is ideal for chilly days and easy layering. It includes a zip-up front, ribbed cuffs, and front pockets for comfort and style. Great for school or weekend fun.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767217/kidshoody1_fxvlcg.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767217/kidshoody1_fxvlcg.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767215/kidshoody2_rlledl.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767220/kidshoody3_kiehhk.avif",
    ],
    category: "kids",
    newPrice: 430,
    oldPrice: 499,
    discount: 14,
    rate: 4.7,
    sizes: ["5-6y", "7-8y", "9-10y"],
    title: "Kids’ Zip Hoodie",
    views: 1219,
  },
  {
    id: "13",
    description: "Kids' denim jeans with elastic waistband.",
    details:
      "Durable and comfy, these jeans are designed for play and ease. With an elastic waist and straight fit, they give kids freedom to move while looking great.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767240/kidsjeans1_ioogdf.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767240/kidsjeans1_ioogdf.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767245/kidsjeans2_xvi359.avif",
    ],
    category: "kids",
    newPrice: 380,
    oldPrice: 450,
    discount: 16,
    rate: 4.5,
    sizes: ["4-5y", "6-7y", "8-9y"],
    title: "Kids’ Denim Jeans",
    views: 1024,
  },
  {
    id: "14",
    description: "Boys’ sports shorts made for comfort and activity.",
    details:
      "Made from moisture-wicking fabric, these shorts are perfect for active kids. They feature an elastic waistband, two side pockets, and breathable mesh lining.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767238/kidsshort1_ttgmcs.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767238/kidsshort1_ttgmcs.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767240/kidsshort2_vjsdmx.avif",
    ],
    category: "kids",
    newPrice: 270,
    oldPrice: 349,
    discount: 23,
    rate: 4.6,
    sizes: ["5-6y", "7-8y", "9-10y"],
    title: "Kids’ Sports Shorts",
    views: 900,
  },
  {
    id: "15",
    description: "Girls’ pastel dress for parties and events.",
    details:
      "This charming dress is ideal for birthdays and special occasions. It features soft layers of tulle, a satin waistband, and a comfortable inner lining for all-day wear.",
    mainImage:
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767226/kidsdress1_lzelt9.avif",
    images: [
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767226/kidsdress1_lzelt9.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767253/kidsdress2_yvz7cw.avif",
      "https://res.cloudinary.com/dh6ifjhb7/image/upload/v1752767218/kidsdress3_iz2ojb.avif",
    ],
    category: "kids",
    newPrice: 720,
    oldPrice: 899,
    discount: 20,
    rate: 4.9,
    sizes: ["4-5y", "6-7y", "8-9y"],
    title: "Girls’ Party Dress",
    views: 1567,
  },
];

export const uploadToFirestore = async () => {
  for (const product of products) {
    const ref = doc(firestore, "products", product.id);
    await setDoc(ref, product);
  }
  console.log("Uploaded to Firestore");
};

////////////////////////////////////////////////

export const addProduct = async (product: ProductType) => {
  try {
    const productRef = doc(firestore, "products", product.id);
    await setDoc(productRef, product);
    console.log("Product added");
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

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
      return null;
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

export const filterByName = async (keyword: string) => {
  try {
    const snapshot = await getDocs(collection(firestore, "products"));
    const products = snapshot.docs.map((doc) => doc.data());
    return products.filter((p) =>
      p.title.toLowerCase().includes(keyword.toLowerCase())
    );
  } catch (error) {
    console.error("Error filtering by name:", error);
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

export const sortByPriceLowToHigh = async () => {
  const q = query(
    collection(firestore, "products"),
    orderBy("newPrice", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};
export const sortByPriceHighToLow = async () => {
  const q = query(
    collection(firestore, "products"),
    orderBy("newPrice", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data());
};

export const getTopRated = async (n: number) => {
  const q = query(
    collection(firestore, "products"),
    orderBy("rate", "desc"),
    limit(n)
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

////////////////main function

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
