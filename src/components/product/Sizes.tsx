import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useUserData } from "../../context/UserDataContext";

const Sizes = ({
  sizes,
  selectedSize,
  id,
}: {
  sizes: string[];
  selectedSize?: string;
  id?: string;
}) => {
  const [activeSize, setActiveSize] = useState(0);
  const { updateCartSize } = useUserData();

  const handleSelect = async (index: number) => {
    if (!id) return;
    const selectedSize = sizes[index];
    await updateCartSize(id, selectedSize);
  };
  return (
    <View style={styles.container}>
      {!id && <Text style={styles.head}>Size: {sizes[activeSize]}</Text>}
      <View style={styles.sizesContainer}>
        {sizes.map((size, i) => (
          <Pressable
            style={[
              styles.sizeBox,
              (!id && activeSize === i) || (id && selectedSize === size)
                ? styles.activeBox
                : styles.inActiveBox,
              id && { paddingVertical: 2, paddingHorizontal: 4 },
            ]}
            onPress={() => {
              id ? handleSelect(i) : setActiveSize(i);
            }}
            key={size}
          >
            <Text
              style={[
                styles.text,
                (!id && activeSize === i) || (id && selectedSize === size)
                  ? styles.activeText
                  : styles.inActiveText,
                { fontSize: id ? SIZES.small + 2 : SIZES.medium },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Sizes;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    gap: 12,
  },
  head: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  sizesContainer: {
    flexDirection: "row",
    gap: 8,
  },
  sizeBox: {
    borderRadius: 4,
    padding: 8,
  },
  activeBox: {
    backgroundColor: COLORS.main5,
  },
  inActiveBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.main5,
  },
  text: {
    fontFamily: FONTS.semiBold,
  },
  activeText: {
    color: COLORS.white,
  },
  inActiveText: {
    color: COLORS.main5,
  },
});
