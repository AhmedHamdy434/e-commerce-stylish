import { useEffect, useRef } from "react";
import { Animated, Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

const LogoSplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const duration = 2000;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, duration);
    return () => clearTimeout(timer);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
          },
        ]}
      >
        <Image source={require("../../assets/Logo.png")} style={styles.logo} />
        <Text style={styles.text}>Stylish</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default LogoSplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 125,
    height: 100,
  },
  text: {
    fontFamily: FONTS.bold,
    fontSize: 40,
    color: COLORS.main,
  },
});
