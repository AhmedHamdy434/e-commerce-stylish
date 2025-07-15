import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./screens/auth/SignIn";
import SignUpScreen from "./screens/auth/SignUp";
import { createStaticNavigation } from "@react-navigation/native";

const AuthStack = createNativeStackNavigator({
  initialRouteName: "SignIn",
  screens: {
    SignIn: {
      screen: SignInScreen,
      options: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUpScreen,
      options: {
        headerShown: false,
      },
    },
  },
});

export const AuthNavigation = createStaticNavigation(AuthStack);
