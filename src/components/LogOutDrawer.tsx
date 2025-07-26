import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { logout } from "../firebase/authFunctions";

const LogOutDrawer = () => {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={() => handleLogout()}
        style={{ backgroundColor: "red", padding: 8 }}
      >
        <Text style={{ color: "white" }}>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default LogOutDrawer;
