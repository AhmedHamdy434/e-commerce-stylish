import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { filterByCategory, ProductType } from "../../firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import Loading from "../Loading";
import ProductCard from "../ProductCard";

const Similar = ({ category, id }: { category: string; id: string }) => {
  const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const showSimilar = async () => {
    try {
      setLoading(true);
      setError(false);

      const data: any = await filterByCategory(category);
      const filtered = data.filter((product: ProductType) => product.id !== id);
      setSimilarProducts(filtered);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setSimilarProducts([]);
  }, [id]);
  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={showSimilar}
        disabled={similarProducts.length !== 0}
      >
        <View style={styles.textContainer}>
          <AntDesign name="eyeo" color={COLORS.black} size={24} />
          <Text style={styles.text}>View Similar</Text>
        </View>
      </TouchableOpacity>
      {loading ? (
        <View style={{ width: "100%", height: 200 }}>
          <Loading />
        </View>
      ) : error ? (
        <View style={{ width: "100%", height: 200 }}>
          <Text
            style={{
              color: COLORS.main,
              fontFamily: FONTS.bold,
              textAlign: "center",
            }}
          >
            Failed to load deals
          </Text>
        </View>
      ) : (
        similarProducts && (
          <View style={styles.mapping}>
            {similarProducts.map((product) => (
              <ProductCard isSearch key={product.id} product={product} />
            ))}
          </View>
        )
      )}
    </>
  );
};

export default Similar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: COLORS.gray2,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    alignSelf: "center",
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: "row",
    gap: 8,
    padding: 4,
  },
  text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  mapping: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});
