import { Text, Button } from "@react-navigation/elements";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/theme";

export function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={{ color: COLORS.main }}>404</Text>
      <Button color={COLORS.main} screen={"Home" as never}>
        Go to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
