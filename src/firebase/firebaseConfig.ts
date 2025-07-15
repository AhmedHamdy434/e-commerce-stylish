import { getApp, getApps, initializeApp } from "firebase/app";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQwiooLVT034I9ZLB3H51CPu9f8xjGW0c",
  authDomain: "e-commerce-app-c5ea8.firebaseapp.com",
  projectId: "e-commerce-app-c5ea8",
  storageBucket: "e-commerce-app-c5ea8.firebasestorage.app",
  messagingSenderId: "440427576670",
  appId: "1:440427576670:web:49469cb6716c94e3fde3cf",
  measurementId: "G-VJBEEHHQZC",
};

// Initialize Firebase

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = initializeAuth(app);
