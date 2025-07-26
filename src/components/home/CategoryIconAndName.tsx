import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { HomeTabsParamList } from "../../navigation";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

const CategoryIconAndName = ({
  category,
}: {
  category: { title: string; image: React.JSX.Element };
}) => {
  const { title, image } = category;
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeTabsParamList>>();
  const handleNavigateToSearchScreen = () => {
    navigation.navigate("Search", {
      filter: title === "All" ? "" : title.toLocaleLowerCase(),
    });
  };
  return (
    <TouchableOpacity
      onPress={handleNavigateToSearchScreen}
      style={styles.card}
    >
      {image}
      <Text style={styles.name}>{title}</Text>
    </TouchableOpacity>
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
