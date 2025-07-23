import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useUserData } from "../../context/UserDataContext";

const SpecialButtons = ({ isCart, id }: { isCart: boolean; id: string }) => {
  const navigation = useNavigation();
  const { cart, handleAddToCart, handleRemoveFromCart } = useUserData();
  const addedToCart = cart.includes(id);

  const handleAddOrRemoveCart = async () => {
    addedToCart ? await handleRemoveFromCart(id) : await handleAddToCart(id);
    ToastAndroid.show(
      addedToCart ? "Item removed from Cart" : "Item added to Cart",
      ToastAndroid.SHORT
    );
  };

  const handleGoToBuyingPage = () =>
    navigation.navigate("HomeTabs", { screen: "Cart" });
  return (
    <Pressable
      onPress={isCart ? handleAddOrRemoveCart : handleGoToBuyingPage}
      style={{ position: "relative" }}
    >
      <LinearGradient
        style={styles.gradient}
        colors={isCart ? ["#3F92FF", "#0B3689"] : ["#71F9A9", "#31B769"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Text style={styles.text}>
          {isCart
            ? addedToCart
              ? "Remove from Cart"
              : "Add to Cart"
            : "Buy Now"}
        </Text>
        <LinearGradient
          colors={isCart ? ["#3F92FF", "#0B3689"] : ["#71F9A9", "#31B769"]}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.absolute}
        >
          {isCart ? (
            <Ionicons name="cart-outline" color={COLORS.white} size={24} />
          ) : (
            <FontAwesome5 name="hand-pointer" color={COLORS.white} size={24} />
          )}
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
};

export default SpecialButtons;

const styles = StyleSheet.create({
  gradient: {
    marginStart: 20,
    padding: 8,
    paddingStart: 28,
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
  absolute: {
    position: "absolute",
    top: -2,
    start: -20,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
