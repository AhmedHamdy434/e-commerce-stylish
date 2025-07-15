import { Pressable, StyleSheet, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { COLORS, FONTS } from "../../constants/theme";

const AuthInput = ({
  placeholder,
  value,
  setValue,
  isPassword = true,
}: {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isPassword?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.input}
        keyboardType={isPassword ? "default" : "email-address"}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        secureTextEntry={isPassword ? !showPassword : false}
        onChangeText={setValue}
        value={value}
        selectionColor={COLORS.main}
      />
      {isPassword ? (
        <MaterialIcons name="lock" size={24} style={styles.inputIcon} />
      ) : (
        <FontAwesome name="user" size={24} style={styles.inputIcon} />
      )}
      {isPassword && (
        <Pressable
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.eyePressable}
          hitSlop={10}
        >
          <Entypo
            name={showPassword ? "eye" : "eye-with-line"}
            size={20}
            style={styles.eyeIcon}
          />
        </Pressable>
      )}
    </View>
  );
};

export default AuthInput;
const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 36,
  },
  input: {
    position: "relative",
    backgroundColor: COLORS.white2,
    borderWidth: 1,
    borderColor: COLORS.text2,
    borderRadius: 10,
    padding: 20,
    paddingStart: 38,
    width: "100%",
    fontSize: 12,
    color: COLORS.input,
    fontFamily: FONTS.medium,
  },
  inputIcon: {
    position: "absolute",
    top: 16,
    start: 12,
    color: COLORS.icon,
  },
  eyePressable: {
    position: "absolute",
    top: 18,
    end: 18,
  },
  eyeIcon: {
    color: COLORS.icon,
  },
});
