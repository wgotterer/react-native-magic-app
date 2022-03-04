import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import DefaultText from "./DefaultText";

const CardItem = (props) => {
  return (
    <View style={styles.cardItem}>
      <TouchableOpacity onPress={props.onSelectCard}>
        <View>
          <View style={{ ...styles.cardRow, ...styles.cardHeader }}>
            <ImageBackground
              resizeMode={"cover"}
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                {/* numberofLines will add ... if it's too long */}
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.cardRow, ...styles.cardDetail }}>
            <DefaultText>{props.expansion.toUpperCase()}</DefaultText>
            <DefaultText>{props.type.toUpperCase()}</DefaultText>
            <DefaultText>{props.rarity.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    height: 600,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    // image acts as a flexbox which allows us to use flex end.
    justifyContent: "flex-end",
  },
  cardRow: {
    flexDirection: "row",
  },
  cardHeader: {
    height: "85%",
  },
  cardDetail: {
    paddingHorizontal: 10,
    // use spacebetween to evenly distribute items on horizonatal axis
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  titleContainer: {
    // rgba has built in transparency so even if picture is white we can read the title
    backgroundColor: "rgba(0,0,0,0.5)",
    // background color box does not sit on edges of text
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
  },
});

export default CardItem;
