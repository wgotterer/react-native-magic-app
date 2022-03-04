import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CardList from "../components/CardList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = (props) => {
  // the first Card accesses the reducer in App.js and the second favoriteCards grabs the slice deined in reducer/Cards.js
  const favCards = useSelector((state) => state.cards.favoriteCards);

  if (favCards.length === 0 || !favCards) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite cards found. Start adding some!</DefaultText>
      </View>
    );
  }
  return <CardList listData={favCards} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default FavoritesScreen;
