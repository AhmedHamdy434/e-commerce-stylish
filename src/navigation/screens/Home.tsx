import { Button, Text } from "@react-navigation/elements";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { logout } from "../../firebase/authFunctions";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
      <Button screen="Profile" params={{ user: "jane" }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
