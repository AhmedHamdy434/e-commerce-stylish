import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SocialIcon from "./SocialIcon";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import {
  loginWithEmail,
  registerWithEmail,
} from "../../firebase/authFunctions";
import { useNavigation } from "@react-navigation/native";

export default function AuthForm({ role }: { role: "sign-in" | "sign-up" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const socials = [
    <AntDesign name="google" size={26} color="red" />,
    <AntDesign name="apple1" size={26} color="black" />,
    <EvilIcons name="sc-facebook" size={30} color="blue" />,
  ];

  const handleLogin = async () => {
    setError("");
    const response = await loginWithEmail(email, password);
    if (!response.success) setError(response.message || "there is an error");
  };
  const handleSignup = async () => {
    setError("");
    const response = await registerWithEmail(email, password, confirmPassword);
    if (!response.success) setError(response.message || "there is an error");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <AuthHeader
            text1={role === "sign-in" ? "Welcome" : "Create an"}
            text2={role === "sign-in" ? "Back!" : "account"}
          />
          <AuthInput
            value={email}
            placeholder="Email"
            setValue={setEmail}
            isPassword={false}
          />
          <AuthInput
            value={password}
            placeholder="Password"
            setValue={setPassword}
          />
          {role === "sign-in" ? (
            <TouchableOpacity style={styles.forgtbtn}>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          ) : (
            <>
              <AuthInput
                value={confirmPassword}
                placeholder="ConfirmPassword"
                setValue={setConfirmPassword}
              />
              <Text style={styles.terms}>
                By clicking the
                <Text style={{ color: COLORS.main2 }}>Register</Text> button,
                you agree{"\n"} to the public offer
              </Text>
            </>
          )}
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity
            style={[
              styles.loginBtn,
              { marginBottom: role === "sign-in" ? 75 : 30 },
            ]}
            onPress={role === "sign-in" ? handleLogin : handleSignup}
          >
            <Text style={styles.loginText}>
              {role === "sign-in" ? "Login" : "Create Account"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.or}>- OR Continue with -</Text>

          <View style={styles.socialContainer}>
            {socials.map((social, i) => (
              <SocialIcon key={i}>{social}</SocialIcon>
            ))}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.signupText}>
              {role === "sign-in"
                ? "Create An Account "
                : "I Already Have an Account "}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  role === "sign-in" ? ("SignUp" as never) : ("SignIn" as never)
                )
              }
            >
              <Text style={styles.signupLink}>
                {role === "sign-in" ? "Sign Up" : "Log in"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 28,
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  welcome: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  forgtbtn: {
    alignSelf: "flex-end",
    marginTop: 9,
    marginBottom: 52,
  },
  forgot: {
    color: COLORS.main,
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  terms: {
    color: COLORS.input,
    fontSize: 12,
    fontFamily: FONTS.regular,
    marginTop: 16,
    marginBottom: 40,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: -16,
    marginBottom: 16,
  },
  loginBtn: {
    backgroundColor: COLORS.main,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 75,
  },
  loginText: {
    color: COLORS.white,
    fontFamily: FONTS.semiBold,
    fontSize: 20,
  },
  or: {
    textAlign: "center",
    color: COLORS.gray3,
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 28,
  },
  signupText: {
    textAlign: "center",
    color: COLORS.gray3,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  signupLink: {
    color: COLORS.main,
    fontFamily: FONTS.semiBold,
    textDecorationLine: "underline",
  },
});
