import React from "react";
import { View, StyleSheet } from "react-native";
// the useSelector hook allows us to take a slice of our state and use it in this component
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
  const catId = props.navigation.getParam("categoryId");

  // the useSelector takes a function that grabs the current state
  // and then we access the slice we want by grabbing the key defined in App.js combineReducer
  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  // Looking to see if the array of categrories is present using indexOf.
  // Checking to see if it's greater than 0 because indexOf will return -1 if not found
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

if (displayedMeals.length === 0){
    return(
        <View style={styles.content}>
            <DefaultText>No meals found. Try checking you filters :D </DefaultText>
        </View>
    )
}

  return (
    <MealList
      listData={displayedMeals}
      //    navigation only works from the component that is loading it.
      // to allow our MealList component to use info from navigation we can pass it as a prop
      navigation={props.navigation}
    />
  );
};

// have it as a function that depends on changing data/ dynamic.
// By default navigation gives us the title as the title as back text if there is space
// when calling the navigationOptions method on the function we get props and
// in the prop we can access navigation object that has the getParam method
CategoryMealsScreen.navigationOptions = (navigationData) => {
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
        alignItems: "center"

    }
})

export default CategoryMealsScreen;
