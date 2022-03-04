import React, {useEffect, useCallback} from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
// We add this headerbuttons and Items(self closing componet) to create header button
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = props => {
  return(
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  )
}

const MealDetailScreen = (props) => {

  const availableMeals = useSelector(state => state.meals.meals)

  const mealId = props.navigation.getParam("mealId");

  const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId))


  const selectedMeal =  availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch()

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId))
  }, [dispatch, mealId])


  // useEffect might not be best option becuase the title takes a little time to load
  // the title is not on detail screen for brief moment. doesn't look good
  useEffect(()=> {
    // props.navigation.setParams({mealTitle: selectedMeal.title})
    props.navigation.setParams({toggleFav: toggleFavoriteHandler})
  }, [selectedMeal])

  useEffect(() => {
    props.navigation.setParams({isFav: currentMealIsFavorite})
  }, [currentMealIsFavorite])


  return (
    <ScrollView>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => <ListItem key={ingredient}>{ingredient}</ListItem>)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => <ListItem key={step}>{step}</ListItem>)}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {

  // const mealId = navigationData.navigation.getParam("mealId");
  const mealTitle = navigationData.navigation.getParam("mealTitle")
  const toggleFavorite = navigationData.navigation.getParam('toggleFav')
  const isFavorite = navigationData.navigation.getParam("isFav")
  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);


  return {
    headerTitle: mealTitle,
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
  image:{
    width: "100%",
    height: 600

  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center"
  },
  listItem: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
