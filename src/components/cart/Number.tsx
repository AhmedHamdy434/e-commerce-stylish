import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useUserData } from "../../context/UserDataContext";

const Number = ({
  id,
  size,
  quantity,
}: {
  id: string;
  size: string;
  quantity: number;
}) => {
  const [loading, setLoading] = useState(false);

  const { handleAddToCart, handleRemoveFromCart, handleDecreaseCart } =
    useUserData();

  const handleIncrease = async () => {
    if (loading) return;
    setLoading(true);
    await handleAddToCart(id, size);
    setLoading(false);
  };

  const handleDecrease = async () => {
    if (loading) return;
    setLoading(true);

    if (quantity > 1) {
      await handleDecreaseCart(id);
    } else {
      Alert.alert("Remove Item", "Do you want to remove this item?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await handleRemoveFromCart(id);
          },
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={loading} onPress={handleDecrease}>
        <AntDesign name="minuscircleo" size={16} color={COLORS.black} />
      </TouchableOpacity>
      <Text>{quantity}</Text>
      <TouchableOpacity disabled={loading} onPress={handleIncrease}>
        <AntDesign name="pluscircleo" size={16} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginVertical: 5,
  },
});
