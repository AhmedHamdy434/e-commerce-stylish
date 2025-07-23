import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";

const Sizes = ({ sizes }: { sizes: string[] }) => {
  const [activeSize, setActiveSize] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Size: {sizes[activeSize]}</Text>
      <View style={styles.sizesContainer}>
        {sizes.map((size, i) => (
          <Pressable
            style={[
              styles.sizeBox,
              activeSize === i ? styles.activeBox : styles.inActiveBox,
            ]}
            onPress={() => setActiveSize(i)}
            key={size}
          >
            <Text
              style={[
                styles.text,
                activeSize === i ? styles.activeText : styles.inActiveText,
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
    fontSize: SIZES.medium,
  },
  activeText: {
    color: COLORS.white,
  },
  inActiveText: {
    color: COLORS.main5,
  },
});
