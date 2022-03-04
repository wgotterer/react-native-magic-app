import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import cardsReducer from "../store/reducers/cards";

import CardItem from "./CardItem";

const CardList = (props) => {
  // reminder! can only use useSelector in the route component. Can't in nested(renderMealItem)
  // doing this so the star is already filled when go to the detail screen and isn't empty for a second
  const favoriteCards = useSelector((state) => state.cards.favoriteCards);

  const renderCardItem = (itemData) => {
    const isFavorite = favoriteCards.some(
      (card) => card.id === itemData.item.id
    );

    return (
      <CardItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        expansion={itemData.item.expansion}
        type={itemData.item.type}
        rarity={itemData.item.rarity}
        onSelectCard={() => {
          props.navigation.navigate({
            routeName: "CardDetail",
            params: {
              cardId: itemData.item.id,
              //   we are setting the title in the component that is rendered before the mealDetailScreen
              // this way the title header is loaded before the click and we immediatly see the title
              cardTitle: itemData.item.title,
              isFav: isFavorite,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderCardItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default CardList;
