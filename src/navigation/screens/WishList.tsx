import { getProductsByIds, ProductType } from "../../firebase/firestore";
import WishListAndSearchComponent from "../../components/WishListAndSearchComponent";
import Loading from "../../components/Loading";
import { useUserData } from "../../context/UserDataContext";
import { useFetch } from "../../hook/useFetch";
import { NotFound } from "./NotFound";

const WishList = () => {
  const { favorites } = useUserData();
  const {
    data: products,
    loading,
    error,
  } = useFetch<ProductType[]>(() => getProductsByIds(favorites));

  if (loading) return <Loading />;
  if (!products || error) return <NotFound />;
  return <WishListAndSearchComponent products={products} />;
};

export default WishList;
