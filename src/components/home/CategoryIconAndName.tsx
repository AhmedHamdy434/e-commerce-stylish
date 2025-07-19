import { StyleSheet, Text, View } from "react-native";

const CategoryIconAndName = ({
  category,
}: {
  category: { title: string; image: React.JSX.Element };
}) => {
  const { title, image } = category;
  return (
    <View style={styles.card}>
      {image}
      <Text style={styles.name}>{title}</Text>
    </View>
  );
};

export default CategoryIconAndName;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    marginRight: 20,
  },
  name: {
    fontSize: 12,
    color: "#333",
  },
});
