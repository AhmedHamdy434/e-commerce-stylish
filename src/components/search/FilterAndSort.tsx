import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { Fontisto } from "@expo/vector-icons";

type Props = {
  onFilterChange: (params: {
    keyword: string;
    category: string;
    sortBy: "priceAsc" | "priceDesc" | "discount" | "views" | "rate" | "";
  }) => void;
  lengthOfSearch: number;
};

const categories = ["", "men", "women", "kids"];
const sortOptions = [
  { label: "None", value: "" },
  { label: "Low → High", value: "priceAsc" },
  { label: "High → Low", value: "priceDesc" },
  { label: "Top Discount", value: "discount" },
  { label: "Most Viewed", value: "views" },
  { label: "Top Rated", value: "rate" },
];

const FilterAndSort = ({ onFilterChange, lengthOfSearch }: Props) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<
    "" | "priceAsc" | "priceDesc" | "discount" | "views" | "rate"
  >("");

  const handleChange = (newValues = {}) => {
    const values = {
      keyword,
      category,
      sortBy,
      ...newValues,
    };
    onFilterChange(values);
  };
  return (
    <>
      <View style={styles.InputContainer}>
        <Fontisto
          name="search"
          size={18}
          color={COLORS.gray4}
          style={styles.icon}
        />
        <TextInput
          placeholder="Search any Product..."
          placeholderTextColor={COLORS.gray4}
          style={styles.input}
          value={keyword}
          onChangeText={(text) => {
            setKeyword(text);
            handleChange({ keyword: text });
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{lengthOfSearch} items</Text>{" "}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollGroup}
      >
        {categories.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.button, category === c && styles.activeButton]}
            onPress={() => {
              setCategory(c);
              handleChange({ category: c });
            }}
          >
            <Text
              style={[
                styles.buttonText,
                category === c && styles.activeButtonText,
              ]}
            >
              {c === "" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollGroup}
      >
        {sortOptions.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.button, sortBy === opt.value && styles.activeButton]}
            onPress={() => {
              setSortBy(opt.value as any);
              handleChange({ sortBy: opt.value });
            }}
          >
            <Text
              style={[
                styles.buttonText,
                sortBy === opt.value && styles.activeButtonText,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default FilterAndSort;

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    position: "relative",
  },
  input: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    paddingStart: 46,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black,
  },
  icon: {
    position: "absolute",
    top: 8,
    start: 16,
  },
  container: {
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONTS.semiBold,
  },
  scrollGroup: {
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 8,
  },
  button: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: COLORS.main,
  },
  buttonText: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.medium,
  },
  activeButtonText: {
    color: COLORS.white,
  },
});
