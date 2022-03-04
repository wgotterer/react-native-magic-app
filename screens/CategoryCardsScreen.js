import React from "react";
import { View, StyleSheet } from "react-native";
// the useSelector hook allows us to take a slice of our state and use it in this component
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";
import CardList from "../components/CardList";
import DefaultText from "../components/DefaultText";

const CategoryCardsScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");

  // the useSelector takes a function that grabs the current state
  // and then we access the slice we want by grabbing the key defined in App.js combineReducer
  const availableCards = useSelector((state) => state.cards.filteredCards);

  // Looking to see if the array of categrories is present using indexOf.
  // Checking to see if it's greater than 0 because indexOf will return -1 if not found
  const displayedCards = availableCards.filter(
    (card) => card.categoryIds.indexOf(catId) >= 0
  );

  if (displayedCards.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No cards found. Try checking your filters :D </DefaultText>
      </View>
    );
  }

  return (
    <CardList
      listData={displayedCards}
      //    navigation only works from the component that is loading it.
      // to allow our CardList component to use info from navigation we can pass it as a prop
      navigation={props.navigation}
    />
  );
};

// have it as a function that depends on changing data/ dynamic.
// By default navigation gives us the title as the title as back text if there is space
// when calling the navigationOptions method on the function we get props and
// in the prop we can access navigation object that has the getParam method
CategoryCardsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryCardsScreen;
