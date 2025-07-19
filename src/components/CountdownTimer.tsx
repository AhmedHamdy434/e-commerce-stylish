import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("00h 00m 00s");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );
    };

    // Initial call
    updateCountdown();

    // Update every second
    const timer = setInterval(updateCountdown, 1000);

    // Clear interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 4 }}>
      <MaterialCommunityIcons
        name="timer-settings-outline"
        size={16}
        color={COLORS.white}
      />
      <Text style={styles.timer}>{timeLeft} remaining</Text>
    </View>
  );
};

export default CountdownTimer;
const styles = StyleSheet.create({
  timer: {
    fontSize: 12,
    color: COLORS.white,
    lineHeight: 16,
    fontFamily: FONTS.regular,
    marginTop: 8,
  },
});
