import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { AntDesign, EvilIcons, FontAwesome6 } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { auth } from "../../firebase/firebaseConfig";
import { RootStackParamList } from "../../navigation";
import { getUserContactInfo } from "../../firebase/firestoreUser";
import { useFetch } from "../../hook/useFetch";
import Loading from "../Loading";

const Address = () => {
  const { data, loading, error } = useFetch<{
    address: string;
    mobile: string;
  } | null>(() => getUserContactInfo());

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.headContainer}>
        <EvilIcons name="location" size={16} color={COLORS.black} />
        <Text style={styles.head}>Delivery Address</Text>
      </View>
      {error && (
        <View style={styles.error}>
          <Text style={styles.errorText}>There is an error</Text>
        </View>
      )}
      {loading ? (
        <Loading />
      ) : !data?.address || !data?.mobile || data === null ? (
        <Link<RootStackParamList>
          screen="Profile"
          params={{ user: auth.currentUser?.displayName || "guest" }}
          style={styles.add}
        >
          <AntDesign name="pluscircleo" size={36} color={COLORS.black} />
        </Link>
      ) : (
        <View style={styles.box}>
          <Link<RootStackParamList>
            screen="Profile"
            params={{ user: auth.currentUser?.displayName || "guest" }}
            style={styles.edit}
          >
            <FontAwesome6 name="edit" size={12} color={COLORS.black} />
          </Link>
          <Text style={styles.addressHead}>Address:</Text>
          <Text style={styles.addressHead}>{data.address}</Text>
          <Text style={styles.addressHead}>Contact: {data.mobile}</Text>
        </View>
      )}
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  headContainer: {
    paddingBottom: 10,
    paddingTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: 8,
  },
  head: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },
  box: {
    position: "relative",
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    position: "absolute",
    end: 16,
    top: 16,
  },
  addressHead: {
    fontSize: SIZES.small + 2,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    marginBottom: 4,
  },
  address: {
    fontSize: SIZES.small + 2,
    fontFamily: FONTS.regular,
    color: COLORS.black,
  },
  error: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  errorText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.semiBold,
    color: "red",
  },
  add: {
    textAlign: "center",
    padding: 20,
  },
});
