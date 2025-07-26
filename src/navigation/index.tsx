import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { NotFound } from "./screens/NotFound";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import WishList from "./screens/WishList";
import Cart from "./screens/Cart";
import Search from "./screens/Search";
import { COLORS } from "../constants/theme";
import { View, StyleSheet } from "react-native";
import DetailedProduct from "./screens/DetailedProduct";

const HomeTabs = createBottomTabNavigator({
  screenOptions: () => ({
    tabBarActiveTintColor: COLORS.main,
    tabBarInactiveTintColor: COLORS.black,
    tabBarStyle: {
      height: 60,
    },
    headerShown: false,
  }),
  screens: {
    Home: {
      screen: Home,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Feather name="home" size={size} color={color} />
        ),
      },
    },
    Wishlist: {
      screen: WishList,
      options: {
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="favorite-border" size={size} color={color} />
        ),
      },
    },
    Cart: {
      screen: Cart,
      options: {
        tabBarIcon: ({ color, size, focused }) => (
          <View
            style={[
              styles.cartIcon,
              focused && { backgroundColor: COLORS.main },
            ]}
          >
            <Ionicons name="cart-outline" size={size} color={color} />
          </View>
        ),
        tabBarActiveTintColor: COLORS.white,
        tabBarLabel: "",
      },
    },
    Search: {
      screen: Search,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Feather name="search" size={size} color={color} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="user" size={size} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  initialRouteName: "HomeTabs",
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
      },
    },
    Details: {
      screen: DetailedProduct,
      options: {
        headerShown: false,
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

const styles = StyleSheet.create({
  cartIcon: {
    position: "relative",
    top: -8,
    backgroundColor: COLORS.white2,
    borderRadius: 50,
    padding: 12,
    width: 50,
    height: 50,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export const Navigation = createStaticNavigation(RootStack);
export type HomeTabsParamList = {
  Home: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Search: { filter?: string };
  Profile: undefined;
};
export type RootStackParamList = {
  HomeTabs: undefined | { screen: keyof HomeTabsParamList };
  Details: { id: string };
  NotFound: undefined;
};
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
