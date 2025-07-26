import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  validatePassword,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import * as WebBrowser from "expo-web-browser";

interface AuthResponse {
  success: boolean;
  message?: string;
}

WebBrowser.maybeCompleteAuthSession(); // Needed for Expo
const emptyValidation = (email: string, password: string) => {
  if (!email || !password) return "Please input all required inputs";
};
// Password Validation
const passwordValidation = async (password: string) => {
  let passwordErrorMessage = "";
  const status = await validatePassword(auth, password); //check valid password
  if (!status.isValid) {
    if (!status.containsLowercaseLetter)
      passwordErrorMessage = "Needs at least one lowerCase character";
    else if (!status.containsNumericCharacter)
      passwordErrorMessage =
        "Password is too short , it should be 8 character or more";
    else if (!status.containsUppercaseLetter)
      passwordErrorMessage = "Needs at least one upperCase character";
    else if (!status.meetsMinPasswordLength)
      passwordErrorMessage = "Needs at least one number character";
    return passwordErrorMessage;
  }
};

// 1. Email/Password Sign Up
export const registerWithEmail = async (
  email: string,
  password: string,
  confirmPassword: string
): Promise<AuthResponse> => {
  try {
    const empty = emptyValidation(email, password);
    if (empty) return { success: false, message: empty };

    const passUnValid = await passwordValidation(password);
    if (passUnValid) return { success: false, message: passUnValid };
    if (password !== confirmPassword)
      return { success: false, message: "password does not match" };
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, message: "Sign up is successed" };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "There is an Error in Sign Up",
    };
  }
};

// 2. Email/Password Sign In
export const loginWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true, message: "Sign in is successed" };
  } catch {
    return { success: false, message: "There is an Error in Sign In" };
  }
};

// 3. Logout
export const logout = async (): Promise<AuthResponse> => {
  try {
    await signOut(auth);
    return { success: true, message: "log out is successed" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
