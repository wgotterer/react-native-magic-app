import React, { useEffect, useCallback } from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
// We add this headerbuttons and Items(self closing componet) to create header button
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/cards";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const CardDetailScreen = (props) => {
  const availableCards = useSelector((state) => state.cards.cards);

  const cardId = props.navigation.getParam("cardId");

  const currentCardIsFavorite = useSelector((state) =>
    state.cards.favoriteCards.some((card) => card.id === cardId)
  );

  const selectedCard = availableCards.find((card) => card.id === cardId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(cardId));
  }, [dispatch, cardId]);

  // useEffect might not be best option becuase the title takes a little time to load
  // the title is not on detail screen for brief moment. doesn't look good
  useEffect(() => {
    // props.navigation.setParams({CardTitle: selectedCard.title})
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [selectedCard]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentCardIsFavorite });
  }, [currentCardIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedCard.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedCard.expansion.toUpperCase()}</DefaultText>
        <DefaultText>{selectedCard.type.toUpperCase()}</DefaultText>
        <DefaultText>{selectedCard.rarity.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Rulings</Text>
      {selectedCard.rulings.map((ruling) => (
        <ListItem key={ruling}>{ruling}</ListItem>
      ))}
      <Text style={styles.title}>Info</Text>
      {selectedCard.infos.map((info) => (
        <ListItem key={info}>{info}</ListItem>
      ))}
    </ScrollView>
  );
};

CardDetailScreen.navigationOptions = (navigationData) => {
  // const cardId = navigationData.navigation.getParam("cardId");
  const cardTitle = navigationData.navigation.getParam("cardTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  // const selectedCard = Cards.find((card) => card.id === cardId);

  return {
    headerTitle: cardTitle,
    headerRight: (
      // the HeaderButtons component expects a prop that points to the components that we use to render the item in the end
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 600,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default CardDetailScreen;
