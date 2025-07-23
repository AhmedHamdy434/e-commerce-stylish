import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { useUserData } from "../../context/UserDataContext";

const BackBar = ({ id }: { id: string }) => {
  const navigation = useNavigation();
  const { favorites, handleAddToFavorites, handleRemoveFromFavorites } =
    useUserData();
  const isFavorite = favorites.includes(id);

  const handleWishList = async () => {
    isFavorite
      ? await handleRemoveFromFavorites(id)
      : await handleAddToFavorites(id);
    ToastAndroid.show(
      isFavorite ? "Item removed from wishlist" : "Item added to wishlist",
      ToastAndroid.SHORT
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-sharp" size={20} color="#323232" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleWishList} style={styles.cartCircle}>
        <MaterialIcons
          name={isFavorite ? "favorite" : "favorite-border"}
          size={20}
          color={isFavorite ? COLORS.main : "#323232"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    width: "100%",
  },
  cartCircle: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
});
