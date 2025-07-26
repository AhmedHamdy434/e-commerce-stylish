import { StyleSheet, Text, View, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const NavBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.text}>Stylish</Text>
      </View>
      <Image
        source={{
          uri: "https://img.icons8.com/ios-filled/50/user-male-circle.png",
        }}
        style={styles.avatar}
      />
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logo: {
    width: 38,
    height: 32,
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.blue,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
