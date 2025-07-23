import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  View,
  ImageSourcePropType,
} from "react-native";

const ImageWithLoading = ({ image }: { image: ImageSourcePropType }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#888" />
        </View>
      )}
      <Image
        source={image}
        resizeMode="cover"
        style={styles.image}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

export default ImageWithLoading;

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
});
