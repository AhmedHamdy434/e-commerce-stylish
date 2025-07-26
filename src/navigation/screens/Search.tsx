import {
  ProductType,
  searchFilterSortProducts,
} from "../../firebase/firestore";
import { useEffect, useState } from "react";
import WishListAndSearchComponent from "../../components/WishListAndSearchComponent";
import Loading from "../../components/Loading";
import { NotFound } from "./NotFound";
import { HomeTabsParamList } from "..";
import { RouteProp, useRoute } from "@react-navigation/native";

type SearchRouteProp = RouteProp<HomeTabsParamList, "Search">;

const Search = () => {
  const route = useRoute<SearchRouteProp>();
  const filter = route.params?.filter;
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleFilterChange = async ({
    keyword,
    category,
    sortBy,
  }: {
    keyword: string;
    category: string;
    sortBy: any;
  }) => {
    const data = await searchFilterSortProducts({
      keyword,
      category,
      sortBy,
    });
    setProducts(data);
  };

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setIsLoading(true);
        await handleFilterChange({
          keyword: "",
          category: filter || "",
          sortBy: "",
        });
        setError(false);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitial();
  }, []);

  if (isLoading) return <Loading />;
  if (!products || error) return <NotFound />;
  return (
    <WishListAndSearchComponent
      filter={filter}
      products={products}
      handleFilterChange={handleFilterChange}
    />
  );
};

export default Search;
