import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import CategoryIconAndName from "./CategoryIconAndName";

const CategoryList = () => {
  const categories = [
    {
      title: "All",
      image: (
        <Image source={require("../../assets/all.png")} style={styles.icon} />
      ),
    },
    {
      title: "Men",
      image: (
        <Image source={require("../../assets/men.png")} style={styles.icon} />
      ),
    },
    {
      title: "Women",
      image: (
        <Image source={require("../../assets/woman.png")} style={styles.icon} />
      ),
    },
    {
      title: "Kids",
      image: (
        <Image source={require("../../assets/kid.png")} style={styles.icon} />
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Featured</Text>
      <FlatList
        data={categories}
        horizontal
        contentContainerStyle={{ paddingVertical: 16 }}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <CategoryIconAndName category={item} />}
      />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: "100%",
  },
  title: {
    textAlign: "left",
    fontSize: 18,
    fontWeight: "600",
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 50,
    marginBottom: 5,
  },
});
