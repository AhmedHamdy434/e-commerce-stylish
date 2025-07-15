import { Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
const AuthHeader = ({ text1, text2 }: { text1: string; text2: string }) => {
  return (
    <Text style={styles.welcome}>
      {text1}
      {"\n"}
      {text2}
    </Text>
  );
};

export default AuthHeader;
const styles = StyleSheet.create({
  welcome: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
});
