import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
// createMaterialBottomTabNavigator allows use to customize that bottom tabs in a better style for android
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs"

// first argument is your screen object and the second argument configures the navigator
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
    },

    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    // pages slide from the bottom instead of deafault popping, only for IOS
    mode: "modal",

    //  can use initialRouteName to set the initial route. "Categories" is our default
    //  initialRouteName: "Categories"

    // allow us to set up options that apply to every screen in the navigator
    // now we don't have to repeat the code in every screen
    // defaultNavOpts get merged with the specific navOptions in a components
    // the sepecif navOptions will always override the defaultNavOption is the same name, or key, is found in both
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor:
          Platform.OS === "android" ? Colors.primaryColor : "white",
      },
      // styles title headerTint
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primaryColor,
    },
  }
);

const MealsFavTabNavigator = createBottomTabNavigator(
  {
    // our first tab is rendering the navigation stack of screens
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        // tabBarIcon is a function that gets passed an argument automatically by react native
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarLabel: "Favorites!",

        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    // tabBarOptions allows us to control how tab is styled.
    tabBarOptions: {
      activeTintColor: Colors.accentColor,
    },
  }
);

// we can use MealsFavTabNavgator because or MealsNavigator we use in the header is nested inside
export default createAppContainer(MealsFavTabNavigator);
