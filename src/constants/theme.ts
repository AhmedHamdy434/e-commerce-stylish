import { PixelRatio } from "react-native";
const fontScale = PixelRatio.getFontScale();
export const SIZES = {
  small: 9 * fontScale,
  medium: 14 * fontScale,
  large: 18 * fontScale,
  xLarge: 24 * fontScale,
  xxLarge: 36 * fontScale,
};
export const COLORS = {
  main: "#F83758",
  main2: "#FF4B26",
  text2: "#A8A8A9",
  gray: "#A0A0A1",
  dark: "#17223B",
  gray2: "#C4C4C4",
  gray3: "#575757",
  input: "#676767",
  icon: "#626262",
  white: "#FFF",
  pink: "#FCF3F6",
  white2: "#F3F3F3",
  black: "#000",
};
export const FONTS = {
  exLight: "MontExLight",
  light: "MontLight",
  regular: "MontRegular",
  medium: "MontMedium",
  semiBold: "MontSemiBold",
  bold: "MontBold",
  exBold: "MontExBold",
};
