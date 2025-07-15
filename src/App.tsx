import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingSwiper from "./navigation/screens/OnboardingSwiper";
import { useFonts } from "expo-font";
import LogoSplashScreen from "./navigation/screens/LogoSplashScreen";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { AuthNavigation } from "./navigation/AuthNavigator";

export function App() {
  const [showLogo, setShowLogo] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [fontLoaded] = useFonts({
    MontExLight: require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    MontLight: require("../assets/fonts/Montserrat-Light.ttf"),
    MontRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontSemiBold: require("../assets/fonts/Montserrat-SemiBold.ttf"),
    MontBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    MontExBold: require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  useEffect(() => {
    const prepare = async () => {
      try {
        setShowLogo(true);
        await Asset.loadAsync([
          ...NavigationAssets,
          require("./assets/newspaper.png"),
          require("./assets/bell.png"),
        ]);
      } catch (e) {
        console.warn(e);
      }
    };
    prepare();
  }, []);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched === null) {
        await AsyncStorage.setItem("hasLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!fontLoaded || isFirstLaunch === null || !authChecked) return null;
  if (showLogo) return <LogoSplashScreen onFinish={() => setShowLogo(false)} />;
  if (isFirstLaunch)
    return <OnboardingSwiper onFinish={() => setIsFirstLaunch(false)} />;
  if (!user) return <AuthNavigation />;

  return (
    <Navigation
      theme={theme}
      linking={{
        enabled: "auto",
        prefixes: ["ecommerce://"],
      }}
    />
  );
}
