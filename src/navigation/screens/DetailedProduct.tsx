import { RouteProp, useRoute } from "@react-navigation/native";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { RootStackParamList } from "..";
import { getProductById, ProductType } from "../../firebase/firestore";
import Slider from "../../components/Slider";
import { COLORS } from "../../constants/theme";
import BackBar from "../../components/product/BackBar";
import Loading from "../../components/Loading";
import Sizes from "../../components/product/Sizes";
import FullDetails from "../../components/product/FullDetails";
import AddToCartButtonContainer from "../../components/product/AddToCartButtonContainer";
import Similar from "../../components/product/Similar";
import { NotFound } from "./NotFound";
import { useFetch } from "../../hook/useFetch";
type DetailedRouteProp = RouteProp<RootStackParamList, "Details">;

const DetailedProduct = () => {
  const route = useRoute<DetailedRouteProp>();
  const { id }: { id: string } = route.params;

  const {
    data: productData,
    loading,
    error,
  } = useFetch<ProductType>(() => getProductById(id));

  if (loading) return <Loading />;
  if (!productData || error) return <NotFound />;
  const { images, sizes, category } = productData;
  const slides: { key: string; image: { uri: string } }[] = images.map(
    (image, i) => ({
      key: `${i}`,
      image: { uri: image },
    })
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <BackBar id={id} />
        <Slider slides={slides} heightOfImage={240} />
        <View style={styles.contain}>
          <Sizes sizes={sizes} />
          <FullDetails product={productData} />
          <AddToCartButtonContainer sizes={sizes} id={id} />
          <Similar category={category} id={id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailedProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    gap: 16,
    paddingBottom: 24,
  },
  contain: {
    width: "100%",
    paddingHorizontal: 16,
    gap: 16,
  },
});
