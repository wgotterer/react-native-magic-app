import React from "react";
import { Platform } from "react-native";
// we downloaded the header button package as it helps format header buttons nicely across platforms
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
  // we forward all props with this trick using the spread operater
  // passes all of the key value pairs in this object which is the HeaderButton
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
