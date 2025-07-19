import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants/theme";
import CountdownTimer from "../CountdownTimer";
import { Link, useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";

const ColoredBanner = ({ isBlue }: { isBlue: boolean }) => {
  const dateNow = new Date();
  const navigaton = useNavigation();
  const styles = useStyles(isBlue);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>
            {isBlue ? "Deal of the Day" : "Trending Products"}
          </Text>
          {isBlue ? (
            <CountdownTimer />
          ) : (
            <View
              style={{ flexDirection: "row", alignItems: "flex-end", gap: 4 }}
            >
              <AntDesign name="calendar" size={16} color={COLORS.white} />
              <Text style={styles.timer}>
                Last Date{" "}
                {`${dateNow.getDate()}/${
                  dateNow.getMonth() + 1
                }/${dateNow.getFullYear()}`}
              </Text>
            </View>
          )}
        </View>
        <Link screen={"Search" as never} style={styles.viewAll}>
          <Text style={styles.text}>View all </Text>
          <AntDesign name="arrowright" size={12} color={COLORS.white} />
        </Link>
      </View>
    </View>
  );
};

export default ColoredBanner;

const useStyles = (isBlue: boolean) =>
  StyleSheet.create({
    container: {
      width: "100%",
      gap: 16,
    },
    headerRow: {
      marginHorizontal: 16,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isBlue ? COLORS.blue : COLORS.main4,
      padding: 8,
      paddingRight: 12,
    },
    title: {
      fontSize: 16,
      color: COLORS.white,
      lineHeight: 20,
      fontFamily: FONTS.medium,
    },
    viewAll: {
      color: COLORS.white,
      borderWidth: 2,
      borderColor: COLORS.white,
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    text: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: FONTS.semiBold,
    },
    timer: {
      fontSize: 12,
      color: COLORS.white,
      lineHeight: 16,
      fontFamily: FONTS.regular,
      marginTop: 8,
    },
  });
