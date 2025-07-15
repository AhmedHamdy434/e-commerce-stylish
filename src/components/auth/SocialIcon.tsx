import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/theme";
import { ReactNode } from "react";

const SocialIcon = ({ children }: { children: ReactNode }) => {
  return <View style={styles.iconContainer}>{children}</View>;
};

export default SocialIcon;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: COLORS.main,
    backgroundColor: COLORS.pink,
  },
});
