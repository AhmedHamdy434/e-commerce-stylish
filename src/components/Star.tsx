import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "../constants/theme";

const Star = ({ rate }: { rate: number }) => {
  const stars = Array(5).fill(0);

  return (
    <View style={{ flexDirection: "row" }}>
      {stars.map((_, i) => (
        <View key={i}>
          <FontAwesome
            name={rate > i ? "star" : "star-half-empty"}
            size={14}
            color={rate > i ? COLORS.star : COLORS.gray4}
          />
        </View>
      ))}
    </View>
  );
};

export default Star;
